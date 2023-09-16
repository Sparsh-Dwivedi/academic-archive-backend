const mongoose=require("mongoose");

const JournalSchema=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        authors:[
            {
                first:{type:String},
                last:{type:String},
            },
        ],
        journalTitle:{
            type:String,
        },
        volumeIssue:{
            type:String,
        },
        pageRange:{
            type:String,
        },
        publishedOn:{
            type:String,
        },
        doi:{
            type:String,
        },  
        issn:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Journal",JournalSchema);

//this is how we can create an model 