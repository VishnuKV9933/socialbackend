const {conversation,userConversations,twoUserConversation} =require('../Controllers/ConversationController')

const router =require("express").Router()

router.post("/",conversation)

router.get('/:userId',userConversations)

router.get('/:userId',userConversations)

router.get('/:firstId/twouser/:secondId',twoUserConversation)



module.exports = router 