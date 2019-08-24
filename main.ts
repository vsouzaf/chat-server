import {Server} from "./server/server";
import {salaRouter} from "./sala/sala.router";
import {salaSocket} from "./sala/sala.socket";
import {mensagemSalaSocket} from "./mensagem-sala/mensagem-sala.socket";

const server = new Server();

server.bootstrap([salaRouter], [salaSocket, mensagemSalaSocket]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
