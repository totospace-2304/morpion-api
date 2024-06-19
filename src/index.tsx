import fastify from "fastify";
import cors from "@fastify/cors";
import config from "config";
import * as Type from "@fastify/type-provider-typebox";

const app = fastify({
  ajv: { customOptions: { strict: "log", keywords: ["kind", "modifier"] } },
}).withTypeProvider<Type.TypeBoxTypeProvider>();

app.register(cors);

app.get("/coucou", () => {
  return "coucou";
});

// app.register(esfAcademy, { prefix: "/api/esf-academy" });

async function start() {
  const port = config.get("port") as number;

  try {
    await app.listen({ host: "0.0.0.0", port });
  } catch (err) {
    process.exit(1);
  }
}

start();
