import fastify from "fastify";
import ws from "./ws";
import cors from "@fastify/cors";
import config from "config";
import * as Type from "@fastify/type-provider-typebox";
import * as GameData from "./game-data";

const server = fastify({
  ajv: { customOptions: { strict: "log", keywords: ["kind", "modifier"] } },
}).withTypeProvider<Type.TypeBoxTypeProvider>();
server.register(cors);

const use = (param1: any) => {
  return { param1 };
};
use(ws);

server.get("/api/game", () => {
  return { squares: GameData.squares, currentMove: GameData.currentMove };
});

async function start() {
  const port = config.get("port") as number;

  try {
    await server.listen({ host: "0.0.0.0", port });
  } catch (err) {
    process.exit(1);
  }
}

start();
