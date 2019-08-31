import {Server} from "./server/server";
import {salaRouter} from "./sala/sala.router";
import {salaSocket} from "./sala/sala.socket";
import {mensagemSalaSocket} from "./mensagem-sala/mensagem-sala.socket";
import {mensagemSalaRouter} from "./mensagem-sala/mensagem-sala.router";

const server = new Server();

server.bootstrap([salaRouter, mensagemSalaRouter], [salaSocket, mensagemSalaSocket]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
