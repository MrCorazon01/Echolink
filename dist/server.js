"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");
require("dotenv").config({ path: __dirname + "/.env" });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(express_1.default.static(path.resolve(__dirname, "..", "client/build")));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
console.log("process.env.MONGODB_URI: ", process.env.MONGODB_URI);
mongoose_1.default.connect("mongodb://127.0.0.1:27017/echolink");
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/message"));
app.use("/api", require("./routes/auth"));
const server = app.listen(PORT);
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
global.authUser = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add", (user) => {
        global.authUser.set(user, socket.id);
    });
    socket.on("send-message", ({ to, msg }) => {
        const user = global.authUser.get(to);
        if (user)
            io.to(user).emit("receive-message", msg);
    });
});
