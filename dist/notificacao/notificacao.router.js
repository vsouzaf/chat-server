"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const dispositivo_model_1 = require("../dispositivo/dispositivo.model");
class NotificacaoRouter extends router_1.Router {
    apllyRoutes(application) {
        application.post('/notificacao/enviar/cliente/:nomeCliente/usuario/:idUsuario', (req, resp, next) => {
            let query = {
                cliente: req.params.nomeCliente,
                idUsuario: req.params.idUsuario
            };
            dispositivo_model_1.Dispositivo.find(query, (err, dispositivos) => {
                this.renderObj(dispositivos, resp, next);
            });
        });
    }
}
exports.notificacaoRouter = new NotificacaoRouter();
