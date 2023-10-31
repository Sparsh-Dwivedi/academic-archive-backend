const mongoose=require("mongoose");

const StcSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        duration:{
            type:String,
        },
        startDate:{
            type:String
        },
        endDate:{
            type:String
        },
        organiser:{  //organizing institute or industry name
            type:String
        }
    },
    {timestamps:true}
);

module.exports=mongoose.model("Stc",StcSchema);

//this is how we can create an model 