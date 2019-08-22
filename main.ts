import {Server} from "./server/server";
import {salaRouter} from "./sala/sala.router";
import {salaSocket} from "./sala/sala.socket";

const server = new Server();

server.bootstrap([salaRouter], [salaSocket]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
