const router = require("express").Router();



 const {userSignUP,userLogin,AdminLogin,Otplogin,otpVerify} = require("../Controllers/AuthController");
 const { checkuser ,checkAdmin} = require("../otherFiles/AuthMiddlewares");
 
router.post("/", checkuser ,(req, res) => {
console.log("-------------dsfjdsfjkdshfkjdshkjfhdskjh");
res.json({ status: false });
}); 

router.post("/checkadmin",checkAdmin ,(req, res) => {

console.log("-------------6--------------------");
res.json({status:true})
console.log("-------------7--------------------");
}); 
  
  

router.post("/usersignup",userSignUP);

router.post("/userlogin",userLogin)

router.post("/adminlogin",AdminLogin)

router.get('/otplogin/:mobile',Otplogin)

router.get('/otpverify/:mobile',otpVerify)


module.exports = router;
