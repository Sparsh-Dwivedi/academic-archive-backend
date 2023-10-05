const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        email:{type:String},
        name:{type:String,default:'User'},
        qualification:{type:String},
        ph:{type:Number},
        password:{type:String,required:true},
        avatar:{type:String,default:'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png'},
        department:{type:String},
        isAdmin:{
            type:Boolean,
            default:false,
        },
        //mongoose has defalut option for created date time
    },
    {timestamps:true}
);

module.exports=mongoose.model("User",UserSchema);

//this is how we can create an model 