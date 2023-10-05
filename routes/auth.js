const router=require("express").Router();
const User =require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");
const { verifyTokenAndAuthorization } = require("./middleware");

//find user with username
router.post("/find",async (req,res)=>{
    
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user)   return res.status(200).json({found:0});
        const {password,isAdmin,...rest}=user._doc;
        return res.status(200).json(rest);  
    } catch(err){
        res.status(500).json({message:err}); 
        return res;
    }
});

//REGISTER
router.post("/register",async (req,res)=>{

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        avatar:req.body.avatar,
        name:req.body.name?req.body.name:'User',
        ph:req.body.ph?req.body.ph:null,
        address:req.body.address?req.body.address:'INDIA',
        department:req.body.department,
        qualification:req.body.qualification,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
        //to encrypt the password using aes
    });
    //created a user obj of given schema
    try{
        const user=await newUser.save();   //saved it        
        return res.status(200).json(user);
    } catch(err){
        res.status(500).json({message:err}); 
        return ;
    }

});

//LOGIN
router.post("/login",async (req,res)=>{

    try{
        const user=await User.findOne({username:req.body.username});//get user with given username
        console.log(user);
        if(!user){
            res.status(401).json("Wrong credentials")
            return ;
        }
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const Originalpassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        //get the original password
        if(Originalpassword!==req.body.password){//if password is incorrect
            res.status(401).json("Wrong password")
            return ;
        }
        
        const accessToken =jwt.sign(
            {
            _id:user._id,
            isAdmin:user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"100d"}
        );//this is auth token provided when succesfully login contains information about user_id and isAdmin
        const {password,...others}=user._doc;
        //way to exclude password from user to output
        
        return res.status(200).json({...others,accessToken});
        
    }
    catch(err){
        return res.status(500).json(err);
    }

});

//update user
router.post("/user/update",verifyTokenAndAuthorization,async (req,res)=>{

    if(req.body.password || req.body.username){
        return res.status(404).json({error:"Username & password can't be updated"});
    }
    const {_id,...rest} = req.body;
    try {
        let prev=await User.findById(req.body._id);
        if(!prev || prev._id!=req.body._id){return res.status(404).send("Unable to update User")};
        prev=await User.findByIdAndUpdate(req.body._id,{$set:rest});
        return res.json({"Success":"User Updated Successfully"});  
    }
    catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/getallusers",async(req,res)=>{
    try {
        let prev=await User.find();
        return res.status(200).json(prev);
    } catch (error) {
        
    }
});
module.exports=router;
