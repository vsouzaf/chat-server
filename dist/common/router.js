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
    renderAll(response) {
        return (documents) => {
            if (documents) {
                documents.forEach(document => {
                    this.emit('beforeRender', document);
                });
                response.json(documents);
            }
            else {
                response.json([]);
            }
        };
    }
}
exports.Router = Router;
