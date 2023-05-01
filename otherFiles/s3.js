const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");

const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
  } = require("@aws-sdk/client-s3");

  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const randomImagename = crypto.randomBytes(32).toString("hex");
const bucketName = process.env.AWS_Bucket_Name;
const region = process.env.AWS_Bucket_Region;
const accessKeyId = process.env.AWS_Access_key;
const secretAccessKey = process.env.AWS_Secret_access_key;

const s3 = new S3Client({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
    region: region,
  });



  const uploads=async(body,contenttype)=>{

    const params = {
        Bucket: bucketName,
        Key: randomImagename,
        Body: body,
        ContentType:contenttype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
  }


const  CreateImgUrl = async(key)=>{
 
    const getObjectParams = {
      Bucket: bucketName,  
      Key:key,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

       return url
}

module.exports={
    CreateImgUrl,
    uploads
}