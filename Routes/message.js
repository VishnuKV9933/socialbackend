const {message,getMessages} =require('../Controllers//MessageController')

const router =require("express").Router()


router.post("/",message)

router.get('/:conversationId',getMessages)

module.exports = router 