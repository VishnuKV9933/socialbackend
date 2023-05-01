const router =require("express").Router()
const {addPostNotification,getNotification,likePost,commentPost,replyComment,follow,read}=require("../Controllers/NotificationController")


router.post("/post",addPostNotification)

router.get("/getnotification/:id",getNotification)

router.post("/likepost",likePost)

router.post("/commentpost",commentPost)

router.post("/replycomment",replyComment)

router.post("/follow",follow)

router.patch("/read/:id",read)


module.exports = router  