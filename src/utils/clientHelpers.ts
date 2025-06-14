
import { Client } from "@/data/projectClientData";

// Quick random ID generator (you can later replace with uuid)
export function generateClientId(firstName: string, lastName: string) {
  return (
    firstName.toLowerCase().replace(/[^a-z0-9]/g, "") +
    "-" +
    lastName.toLowerCase().replace(/[^a-z0-9]/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

// Get initials for avatar use
export function getClientInitials(client: Client) {
  return (
    (client.firstName?.[0] ?? "") + (client.lastName?.[0] ?? "")
  ).toUpperCase();
}
