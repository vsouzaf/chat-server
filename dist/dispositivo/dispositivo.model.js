"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dispositivoSchema = new mongoose.Schema({
    token: {
        type: String
    },
    cliente: {
        type: String
    },
    idUsuario: {
        type: String
    }
});
exports.Dispositivo = mongoose.model('Dispositivo', dispositivoSchema);
