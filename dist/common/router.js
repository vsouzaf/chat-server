"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    render(response) {
        return (document) => {
            return this.renderObj(document, response);
        };
    }
    renderObj(document, response) {
        if (document) {
            this.emit('beforeRender', document);
            response.json(document);
        }
        else {
            response.send(404);
        }
    }
}
exports.Router = Router;
