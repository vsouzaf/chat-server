import {Socket} from "../common/socket";
import * as io from "socket.io";
import {salaService} from "../sala/sala.service";
import {mensagemSalaService} from "./mensagem-sala.service";

class MensagemSalaSocket extends Socket {
    apllySockets(socketIO: io.Socket) {
        socketIO.on("enviar-mensagem", (paramsDeEnvioDeMsg) => {
            salaService.getParticipanteDaSalaPorIdExterno(paramsDeEnvioDeMsg.sala, paramsDeEnvioDeMsg.idExterno).then(
                (participante: any) => {
                    mensagemSalaService.salvarMensagem(paramsDeEnvioDeMsg.sala, participante, paramsDeEnvioDeMsg.mensagem).then(
                        (msg) => {
                            socketIO.to(paramsDeEnvioDeMsg.sala).broadcast.emit("mensagem-recebida", msg);
                        }
                    );
                }
            )
        });


        socketIO.on("ler-mensagem", (paramsLerMensagem) => {
            mensagemSalaService.lerMensagem(paramsLerMensagem.sala, paramsLerMensagem.id).then(
                (msg) => socketIO.to(paramsLerMensagem.sala).broadcast.emit("mensagem-lida", msg)
            );
        });
    }
}

export const mensagemSalaSocket = new MensagemSalaSocket();
