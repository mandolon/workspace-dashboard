
import { User } from "@/types/user";
import { ArchitectureRole, CRMRoles } from "@/types/roles";

// Helper: Get user's CRM role, if present, with fallback
export function getCRMRole(user: User | { crmRole?: string; role?: string }): CRMRoles | undefined {
  if ("crmRole" in user && typeof user.crmRole === "string") {
    if (user.crmRole.toLowerCase() === "admin") return "admin";
    if (user.crmRole.toLowerCase() === "team") return "team";
    if (user.crmRole.toLowerCase() === "client") return "client";
  }
  // Infer from architecture role
  if ("role" in user) {
    const r = String(user.role).toLowerCase();
    if (r === "admin") return "admin";
    if (r === "team lead" || r === "team" || r === "project manager" || r === "developer") return "team";
    if (r === "client") return "client";
  }
  return undefined;
}

// Checks for role by CRM/type
export function isAdmin(u: User | { role?: string; crmRole?: string }) {
  return getCRMRole(u) === "admin";
}
export function isTeamMember(u: User | { role?: string; crmRole?: string }) {
  return getCRMRole(u) === "team";
}
export function isClient(u: User | { role?: string; crmRole?: string }) {
  return getCRMRole(u) === "client";
}

// Permission helpers (expandable)
export function canManageUsers(u: User) {
  return isAdmin(u);
}
export function canEditProjects(u: User) {
  return isAdmin(u) || isTeamMember(u);
}
export function canViewAllTasks(u: User) {
  return isAdmin(u);
}

// Role display helper (uses ArchitectureRole for fallback)
export function getRoleDisplayName(u: User | { role?: string }) {
  const role = (u as any).role ?? "";
  // Use mapping from roles if needed, fallback to string
  return String(role)[0].toUpperCase() + String(role).slice(1);
}

// Hierarchy: Admin > Team > Client
export function getRoleRank(u: User): number {
  const crmRole = getCRMRole(u);
  if (crmRole === "admin") return 3;
  if (crmRole === "team") return 2;
  if (crmRole === "client") return 1;
  return 0;
}

// Validate a CRM role string
export function isValidCRMRole(role: any): role is CRMRoles {
  return ["admin", "team", "client"].includes((role ?? "").toLowerCase());
}

// For use everywhere:
export const userRoleHelpers = {
  getCRMRole,
  isAdmin,
  isTeamMember,
  isClient,
  canManageUsers,
  canEditProjects,
  canViewAllTasks,
  getRoleDisplayName,
  getRoleRank,
  isValidCRMRole,
};

export default userRoleHelpers;
