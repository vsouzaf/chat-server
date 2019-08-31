"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const sala_router_1 = require("./sala/sala.router");
const sala_socket_1 = require("./sala/sala.socket");
const mensagem_sala_socket_1 = require("./mensagem-sala/mensagem-sala.socket");
const mensagem_sala_router_1 = require("./mensagem-sala/mensagem-sala.router");
const server = new server_1.Server();
server.bootstrap([sala_router_1.salaRouter, mensagem_sala_router_1.mensagemSalaRouter], [sala_socket_1.salaSocket, mensagem_sala_socket_1.mensagemSalaSocket]).then(server => {
    console.log("Server rodando em:", server.server.address());
}).catch(error => {
    console.log("Falha ao iniciar");
    console.error(error);
    process.exit(1);
});
