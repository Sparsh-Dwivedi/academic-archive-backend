const mongoose=require("mongoose");

const ProjectSchema=new mongoose.Schema(
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

module.exports=mongoose.model("Project",ProjectSchema);

//this is how we can create an model 