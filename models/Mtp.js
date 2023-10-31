const mongoose=require("mongoose");

const MtpSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        student:{
            first:{type:String},
            middle:{type:String},
            last:{type:String},
            rollno:{type:String}
        },
        year:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Mtp",MtpSchema);

//this is how we can create an model 