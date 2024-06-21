import WebSocket from "ws";
import * as GameData from "./game-data";

const wss = new WebSocket.Server({ port: 9101 });
console.log("started web socket server for morpion...");

wss.on("open", function open() {
  console.log("connected");
});

wss.on("connection", function connection(ws) {
  ws.on("message", (data) => {
    const json = JSON.parse(data as any);
    if (json.action === "reset") {
      GameData.reset();
    } else {
      GameData.setData(json.nextSquares);
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            squares: GameData.squares,
            currentMove: GameData.currentMove,
          })
        );
      }
    });
  });
});

wss.on("close", function close() {
  console.log("disconnected");
});

export default wss;
