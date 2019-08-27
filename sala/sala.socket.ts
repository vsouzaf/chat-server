import {Socket} from "../common/socket";
import * as io from "socket.io";
import {salaService} from './sala.service';

class SalaSocket extends Socket {
    apllySockets(socketIO: io.Socket) {
        socketIO.on("entrar-sala", (joinObj) => {
            salaService.getParticipanteDaSalaPorIdExterno(joinObj.sala, joinObj.participante.idExterno).then(
                this.criarSalaDeConversa(socketIO, joinObj)
            ).catch(err => console.log("Participante não é da sala"));
        });
    }

    private criarSalaDeConversa(socketIO: io.Socket, joinObj) {
        return () => {
            socketIO.join(joinObj.sala);
        };
    }
}

export const salaSocket = new SalaSocket();
