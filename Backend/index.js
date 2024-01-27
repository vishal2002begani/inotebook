const connect_mongo=require("./db");
const express=require("express");
const app=express()
app.use(express.json());
connect_mongo();
app.get('/',(req,resp)=>{
    resp.send("hello")
})
app.use('/api/auth' ,require("./routes/Auth"))
app.use('/api/notes' ,require("./routes/Notes"))
app.listen(5000,()=>{
    console.log("port 5000")
})