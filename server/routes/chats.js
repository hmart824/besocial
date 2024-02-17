const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chats_controller');

router.get('/' , chatsController.chatRoom);
router.post('/chat' , chatsController.chat);



module.exports = router;