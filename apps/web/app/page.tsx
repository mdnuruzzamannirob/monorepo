import type { User } from "@myapp/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/health`, { cache: "no-store" });
  const { user } = (await res.json()) as { user: User };
  return <h1>Web connected: {user.name}</h1>;
}
