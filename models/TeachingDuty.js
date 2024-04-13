const mongoose=require("mongoose");

const TeachingDutySchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        year: {
            type: String,
        },
       
        classes:{
            type:String,
        },
        
        courses1:{
            type:String,
        },
        courses2:{
            type:String,
        },
        mode1:{
            type:String,
        },
        mode2:{
            type:String,
        },
        hours1:{
            type:String,
        },
        hours2:{
            type:String,
        },
        taken:{
            type:String,
        },
        excessHours:{
            type:String,
            default:0
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Teaching Duty",TeachingDutySchema);

//this is how we can create an model 