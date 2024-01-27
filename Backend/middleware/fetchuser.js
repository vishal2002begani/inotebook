var jwt=require("jsonwebtoken");
const jwt_secret="asdfghjkl"
const fetchuser=(req,resp,next)=>{
const token=req.header("auth-token");
if(!token)
{
    resp.status(401).send({error:"please authenticate using a valid token "});
}
try {
    const data=jwt.verify(token,jwt_secret);
    req.user=data.user; 
    next();
} catch (error) {
    resp.status(401).send({error:"please authenticate using a valid token "})
}
}
module.exports=fetchuser;
