const mongoose=require("mongoose");

const BtpSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        students:[
            {
            first:{type:String},
            middle:{type:String},
            last:{type:String},
            rollno:{type:String}
            }
        ],
        year:{
            type:String,
        },
        type:{  //major or minor
            type:String
        }
    },
    {timestamps:true}
);

module.exports=mongoose.model("Btp",BtpSchema);

//this is how we can create an model 