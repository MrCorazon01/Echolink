import { Router } from "express";

const { messages, add } = require("../controller/message");

const auth = require("../middleware/auth");

const router = Router();

router.use(auth);

router.get("/message/:user", messages);

router.post("/message", add);

module.exports = router;
