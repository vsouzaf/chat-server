"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const notificacaoSchema = new mongoose.Schema({
    token: {
        type: String
    },
    mensagem: {
        type: String
    },
    dtEnvio: {
        type: Date
    }
});
exports.Notificacao = mongoose.model('Notificacao', notificacaoSchema);
