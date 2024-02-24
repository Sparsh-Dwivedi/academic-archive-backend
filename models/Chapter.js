const mongoose=require("mongoose");

const ChapterSchema=new mongoose.Schema(
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
        editors:[
            {
                first:{type:String},
                middle:{type:String},
                last:{type:String},
            },
        ],
        bookTitle:{
            type:String,    
        },
        refType:{
            type:String,    
        },
        nationality:{
            type:String,    
        },
        publishedOn:{
            type:String,
        },
        doi:{
            type:String,
            unique:true
        },
        publisher:{
            type:String,
        },
        isbn:{
            type:String,
        },
        pageRange:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Chapter",ChapterSchema);

//this is how we can create an model 