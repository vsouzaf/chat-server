import {Socket} from "../common/socket";
import * as io from "socket.io";
import {salaService} from "../sala/sala.service";

class MensagemSalaSocket extends Socket {
    apllySockets(socketIO: io.Socket) {
        socketIO.on("enviar-mensagem", (msgObg) => {
            console.log(msgObg);
            socketIO.to(msgObg.sala).broadcast.emit("chat", msgObg.texto);
        });
    }
}

export const mensagemSalaSocket = new MensagemSalaSocket();
