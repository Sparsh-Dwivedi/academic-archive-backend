const mongoose=require("mongoose");

const ConsultancySchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        awardingAgency:{
            type:String,
        },
        cost:{
            type:String,
        },
        status:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Consultancy",ConsultancySchema);

//this is how we can create an model 