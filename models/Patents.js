const mongoose=require("mongoose");

const PatentSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        country:{
            type:String,
        },
        year:{
            type:String,
        },
        awardNo:{
            type:String,
        },
        status:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Patent",PatentSchema);

//this is how we can create an model 