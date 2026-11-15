import { createApp } from "./app";
import { env } from "./env";

const app = createApp({ corsOrigins: env.CORS_ORIGIN.split(",").map((s) => s.trim()) });

const server = app.listen(env.PORT, () => {
  console.log(`API: http://localhost:${env.PORT}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
