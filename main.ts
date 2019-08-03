import {Server} from "./server/server";

const server = new Server();

server.bootstrap([]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
