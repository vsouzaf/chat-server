"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const dispositivo_model_1 = require("./dispositivo.model");
class DispositivoRouter extends router_1.Router {
    apllyRoutes(application) {
        application.post('/dispositivo', (req, resp, mext) => {
            let dispositivo = new dispositivo_model_1.Dispositivo(req.body);
            dispositivo.save().then(this.render(resp, mext));
        });
    }
}
exports.dispositivoRouter = new DispositivoRouter();
