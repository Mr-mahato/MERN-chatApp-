const express = require('express');
const directMessageRouter = express.Router();
const { getDirectMessages, saveDirectMessage } = require('../controller/directMessageController');

directMessageRouter.get('/directmessage/:sender_id/:receiver_id', getDirectMessages);
directMessageRouter.post('/', saveDirectMessage);

module.exports = directMessageRouter; 