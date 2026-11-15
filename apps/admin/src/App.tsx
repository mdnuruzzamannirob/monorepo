import type { User } from "@myapp/types";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);

  return <h1>{user ? `Admin connected: ${user.name}` : "Loading..."}</h1>;
}
