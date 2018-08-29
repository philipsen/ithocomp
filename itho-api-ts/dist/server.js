"use strict";
// import errorHandler from "errorhandler";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());
/**
 * Start Express server.
 */
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map