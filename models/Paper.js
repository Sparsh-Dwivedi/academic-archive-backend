const mongoose=require("mongoose");

const PaperSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        submittedOn:{
            type:String,
        },
        publishedOn:{
            type:String,
        },
        volume:{
            type:Integer,
        },
        year:{
            type:String,
        },
        doi:{
            type:String,
        },
        authers:[
            {
                type:String,
            },
        ]
    },
    {timestamps:true}
);

module.exports=mongoose.model("User",PaperSchema);

//this is how we can create an model 