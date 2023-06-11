const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkuser = (req, res, next) => {

    const authHeader = req.headers.authorization; 
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        if (token) {
            jwt.verify(token,process.env.userJwtKey, async (err, decodedToken) => {
                if (err) {
                    next();
                } else {
                    const user = await User.findById(decodedToken.id);
                    if (user) {
                        res.json({ status: true, user:user});
                    } else {
                        next();
                    } 
                }
            }); 
        }else{ 
            next();
        }
      }

 
    

  

};

module.exports.checkAdmin=(req,res,next)=>{
let adminId=process.env.adminId
    console.log("------adminchech----------");


    const token=req.cookies.adminjwt
console.log("-------------1--------------------");
console.log(token);
    if(token){ 
        console.log("-------------2--------------------");
        jwt.verify(token,process.env.adminJwtKey,async (err,decodedToken)=>{
            console.log("-------------3--------------------");
            if(err){
                console.log("-------------4--------------------");
                res.json({status:false})
            
            }else if(decodedToken.id===adminId){
                console.log("-------------5--------------------");
                next()  
            } else{
                console.log("-------------7--------------------");
                res.json({status:false})
              
            }
           
        })

    }else  {
        console.log("-------------8--------------------");
        console.log("-------------9--------------------");
        next()
    } 

}