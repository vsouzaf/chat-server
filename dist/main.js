"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const sala_router_1 = require("./sala/sala.router");
const sala_socket_1 = require("./sala/sala.socket");
const server = new server_1.Server();
server.bootstrap([sala_router_1.salaRouter], [sala_socket_1.salaSocket]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
