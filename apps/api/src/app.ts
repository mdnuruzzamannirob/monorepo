import type { User } from "@myapp/types";
import { userSchema } from "@myapp/validators";
import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import helmet from "helmet";

export function createApp(options: { corsOrigins: string[] }) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: options.corsOrigins }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    const user: User = userSchema.parse({ id: "1", name: "Test" });
    res.json({ ok: true, user });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const onError: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  };
  app.use(onError);

  return app;
}
