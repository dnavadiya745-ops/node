const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middleware/user.middkeware");
const chatController = require("../../../controllers/chatbot.controller");

// rouiter -- services -- controller -- call into router
router.post("/chat",userMiddleware.authUser, chatController.botReply);

module.exports = router;