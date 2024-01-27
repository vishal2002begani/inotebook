const connect_mongo=require("./db");
const express=require("express");

const app=express()
app.use(express.json())
connect_mongo();
const port =3000;
app.get('/',(req,resp)=>{
    resp.send("hello")
})
app.use('/api/Auth' ,require("./routes/Auth"))
app.use('/api/Notes' ,require("./routes/Notes"))
app.listen(port,()=>{
    console.log("dfd")
})