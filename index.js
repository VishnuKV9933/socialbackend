const express=require("express")
const app=express()
const mongoose = require("mongoose")
const helmet =require("helmet")
const morgon = require("morgan")
const dotenv =require("dotenv")
const userRouter=require("./Routes/users")
const authRouter=require("./Routes/auth")
const conversationRouter=require("./Routes/converstion")
const message=require("./Routes/message")
const admin = require("./Routes/admin")
const notification = require("./Routes/notification")
const cors = require('cors')
const cookieParser =require("cookie-parser")
mongoose.set('strictQuery', true); 
const bodyParser=require('body-parser')


dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json()) 
app.use(helmet())
app.use(morgon("common"))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://master.dmbqq1mmj9oke.amplifyapp.com");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cors({
  origin: ['https://master.dmbqq1mmj9oke.amplifyapp.com'],
  method: ['GET,PATCH, PUT, POST, DELETE, OPTIONS'],
  credentials: true,
}));

// app.use(cors({
//   origin: ['http://localhost:3000'],
//   method: ['GET','POST'],
//   credentials: true,
// }));

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/conversation",conversationRouter)
app.use("/api/message",message)
app.use("/api/admin",admin)
app.use("/api/notification",notification)







mongoose.connect(process.env.MONGO_URL,
  {   useNewUrlParser: true},
  
    ()=>{
    console.log("connected to mongodb")
}
)



app.listen(4000,()=>{
console.log("backend server is running");
}) 


