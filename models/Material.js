const mongoose=require("mongoose");

const MaterialSchema=new mongoose.Schema(
    {
        uid: [
            {
            type: String,
            required: true,
            },
        ],
        classes:{
            type:String,
        },
        course:{
            type:String,
        },
        consulted:{
            type:String,
        },
        prescribed:{
            type:String,
        },
        additional:{
            type:String,
        }
    },
    {timestamps:true}
);

module.exports=mongoose.model("Material",MaterialSchema);

//this is how we can create an model 