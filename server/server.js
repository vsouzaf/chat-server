"use strict";
exports.__esModule = true;
var restify = require("restify");
var environment_1 = require("../common/environment");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.initRoutes = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this.application = restify.createServer({
                    name: 'sro-app-notificacoes-api',
                    version: '1.0.0'
                });
                _this.application.use(restify.plugins.queryParser());
                for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
                    var router = routers_1[_i];
                    router.apllyRoutes(_this.application);
                }
                _this.application.get('/hello', function (req, resp, next) {
                    resp.json({
                        browser: req.userAgent(),
                        method: req.method,
                        url: req.href(),
                        path: req.path(),
                        query: req.query
                    });
                    return next();
                });
                _this.application.listen(environment_1.environment.server, function () {
                    resolve(_this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    Server.prototype.bootstrap = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return this.initRoutes(routers).then(function () { return _this; });
    };
    return Server;
}());
exports.Server = Server;
