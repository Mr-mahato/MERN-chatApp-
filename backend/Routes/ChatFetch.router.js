const express = require('express');
const chatRouter = express.Router();
const {getRoomChat}  = require('../controller/chatController')
chatRouter.get("/getroomchat/:roomId",getRoomChat);

module.exports = chatRouter;