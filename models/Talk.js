const mongoose=require("mongoose");

const TalkSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        date:{
            type:String,
        },
        venue:{
            type:String
        },
        nationality:{
            type:String
        }
    },
    {timestamps:true}
);

module.exports=mongoose.model("Talk",TalkSchema);

//this is how we can create an model 