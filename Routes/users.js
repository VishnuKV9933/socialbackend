// const { checkuser } = require("../Middlewares/AuthMiddlewares")
const {userPostS3Upload,getPosts,likeUnlike,getuser,addComment,getCommets,addReplyComment,getReplyCommets,
    getUserPosts,updateProfile,profilePictureUpdate,profilePictureRemove,suggestions,follow,unFollow,
    search,editpost,deletePost,postUpdate,deleteComment,deleteReplyComment,getfriends,getLikedUsers,
    getFollowers,getFollowing} =require("../Controllers/UserController")

const router =require("express").Router()

const {upload}=require('../otherFiles/multer')

router.post("/userpost",upload.single('image'),userPostS3Upload)

router.get("/getposts/:userId",getPosts)

router.post("/getuser",getuser)

router.put(`/like/:id/unlike`,likeUnlike)

router.put(`/addcomment`,addComment)

router.post ("/getcomments",getCommets)

router.put("/addreplycomments",addReplyComment)

router.get("/getreplycomments/:commetId",getReplyCommets)

router.get("/userpost/:id",getUserPosts)

router.put('/updateprofile',updateProfile)

router.put('/removeprofilpicture/:id',profilePictureRemove)

router.post('/profilpictureupdate/:id',upload.single('image'),profilePictureUpdate)

 router.get('/getsuggestion/:id',suggestions)

 router.patch('/follow/:userId/:followingId',follow) 
 
 router.patch('/unfollow/:userId/:followingId',unFollow)

router.get("/user/:userId/search",search)

router.get("/editpost/:postId",editpost)

router.post("/postupdate",upload.single('image'),postUpdate)

router.delete("/deletepost/:id",deletePost)

router.delete("/delete/:postId/comment/:id",deleteComment)

router.delete("/deletereply/:commentId/comment/:id",deleteReplyComment)

router.get("/getfriends/:id",getfriends)

router.get("/getlikedpeople/:id",getLikedUsers)

router.get("/getfollowers/:id",getFollowers)

router.get("/getfollowing/:id",getFollowing)






module.exports = router 

 