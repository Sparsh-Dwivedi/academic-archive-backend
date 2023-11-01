const mongoose=require("mongoose");

const PhdSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        scholarName: {
            type: String,
        },
        enrolmentDate:{
            type:String,
        },
        phdTitle:{
            type:String,
        },
        status:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Phd",PhdSchema);

//this is how we can create an model 