const router=require("express").Router();
const User =require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");
const { verifyTokenAndAuthorization } = require("./middleware");

//user nave available
router.post("/find",async (req,res)=>{
    
    try{
        const user=await User.findOne({username:req.body.username});//get user with given username
        return res.status(200).json(user);  
    } catch(err){
        res.status(500).json("error occur"+err); 
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
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),   
        //to encrypt the password using aes
    });
    //created a user obj of given schema
    
    try{
        const user=await newUser.save();   //saved it        
        return res.status(200).json(user);
    } catch(err){
        res.status(500).json("error occur"+err); 
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
            id:user._id,
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

    const user = res.locals.user;
    const uid = req.body.uid ? req.body.uid : user.uid
    const filter = { uid: uid };
    try {
        const findUser = await User.findOneAndUpdate(filter, req.body).clone().exec()
        return res.status(200).json({
            status: 'User updated successfully',
        })
    }
    catch (error) {
        return res.status(500).json(error);
    }    

});

module.exports=router;
