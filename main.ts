import {Server} from "./server/server";
import {salaRouter} from "./sala/sala.router";

const server = new Server();

server.bootstrap([salaRouter]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
