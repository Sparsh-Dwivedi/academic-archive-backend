const mongoose=require("mongoose");

const SocietySchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        societyName: {
            type: String,
        },
        duration:{
            type:String,
        },
    },
    {timestamps:true}
);
    
module.exports=mongoose.model("Society",SocietySchema);

//this is how we can create an model 