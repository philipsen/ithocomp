"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import compression from "compression";  // compresses requests
const express_session_1 = __importDefault(require("express-session"));
// import bodyParser from "body-parser";
//import logger from "./util/logger";
// import lusca from "lusca";
const dotenv_1 = __importDefault(require("dotenv"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// import flash from "express-flash";
// import path from "path";
const mongoose_1 = __importDefault(require("mongoose"));
// import passport from "passport";
// import expressValidator from "express-validator";
// import bluebird from "bluebird";
const secrets_1 = require("./util/secrets");
const MongoStore = connect_mongo_1.default(express_session_1.default);
// // Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env.example" });
// // Controllers (route handlers)
// import * as homeController from "./controllers/home";
// import * as userController from "./controllers/user";
// import * as apiController from "./controllers/api";
// import * as contactController from "./controllers/contact";
// // API keys and Passport configuration
// import * as passportConfig from "./config/passport";
// Create Express server
const app = express_1.default();
// Connect to MongoDB
const mongoUrl = secrets_1.MONGODB_URI;
//(<any>mongoose).Promise = bluebird;
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true }).then(() => { }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
// Express configuration
app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");
// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });
// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (!req.user &&
//     req.path !== "/login" &&
//     req.path !== "/signup" &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)) {
//     req.session.returnTo = req.path;
//   } else if (req.user &&
//     req.path == "/account") {
//     req.session.returnTo = req.path;
//   }
//   next();
// });
// app.use(
//   express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );
/**
 * Primary app routes.
 */
// app.get("/", homeController.index);
// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);
// app.get("/logout", userController.logout);
// app.get("/forgot", userController.getForgot);
// app.post("/forgot", userController.postForgot);
// app.get("/reset/:token", userController.getReset);
// app.post("/reset/:token", userController.postReset);
// app.get("/signup", userController.getSignup);
// app.post("/signup", userController.postSignup);
// app.get("/contact", contactController.getContact);
// app.post("/contact", contactController.postContact);
// app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
// app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
// app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);
// /**
//  * API examples routes.
//  */
// app.get("/api", apiController.getApi);
// app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
// /**
//  * OAuth authentication routes. (Sign in)
//  */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//   res.redirect(req.session.returnTo || "/");
// });
exports.default = app;
//# sourceMappingURL=app.js.map