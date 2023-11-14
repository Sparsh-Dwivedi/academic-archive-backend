const express = require("express")
const mongoose = require("mongoose")
const authRoute=require("./routes/auth")
const papersRoute=require("./routes/papers")
const recordRoute=require("./routes/records")

const cors= require("cors");
const dotenv=require("dotenv");
dotenv.config();
const app=express();     
app.use(cors());

//  console.log(process.env.MONGO_URL);
mongoose.set("strictQuery", true); //to eliminate a error
mongoose
.connect(process.env.MONGO_URL) // we can also use try catch
.then(()=>console.log("db connection successfull")) //if promise return true
.catch((err)=>{console.log(err)});  //if promise return false

app.use(express.json());  

app.use("/api/auth",authRoute);
app.use("/api/papers",papersRoute);
app.use("/api/record",recordRoute);


app.get('/',(req,res)=>{
    res.send('hii this is api');
}) 




//this builds express server in port 5000 
app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server is running");
})