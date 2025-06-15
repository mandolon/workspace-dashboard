
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// These should be set in the project's settings, but for Edge Functions they're automatically injected.
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require admin auth via JWT - get user info
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: corsHeaders },
      );
    }
    const [, token] = authHeader.split(" ");
    // Validate token and check admin role (fetch from user_roles view)
    // Call userinfo endpoint
    const jwtPayload = JSON.parse(
      atob(token.split(".")[1])
    );
    const requesterId = jwtPayload["sub"];
    // Use the function is_admin in SQL
    const { data: isAdmin, error: adminError } = await supabaseAdmin.rpc(
      "is_admin",
      { _user_id: requesterId }
    );
    if (adminError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: "Only admins can use this endpoint" }),
        { status: 403, headers: corsHeaders }
      );
    }

    // Parse body for user_id (uuid)
    const { user_id } = await req.json();
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "Missing user_id" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Delete from profiles first
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", user_id);
    if (profileError) {
      return new Response(
        JSON.stringify({ error: "Profile delete failed: " + profileError.message }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Delete auth.user (Supabase Auth) via admin API
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user_id);
    if (authError) {
      return new Response(
        JSON.stringify({ error: "Auth delete failed: " + authError.message }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify({ status: "User deleted successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || String(error) }),
      { status: 500, headers: corsHeaders }
    );
  }
});
