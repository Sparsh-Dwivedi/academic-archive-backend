const mongoose=require("mongoose");

const ConferenceSchema=new mongoose.Schema(
    {
        uid: [
            {
            type: String,
            required: true,
            },
        ],
        title: {
            type: String,
        },
        authors:[
            {
                first:{type:String},
                middle:{type:String},
                last:{type:String},
                corresponding:{type:Boolean}
            },
        ],
        conferenceTitle:{
            type:String,
        },
        conferenceDate:{
            type:String,
        },
        publisher:{
            type:String,
        },
        publishedOn:{
            type:String,
        },
        doi:{
            type:String,
            unique:true
        },
        isbn:{
            type:String,
        },
        location:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Conference",ConferenceSchema);

//this is how we can create an model 