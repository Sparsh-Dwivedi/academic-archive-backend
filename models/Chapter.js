const mongoose=require("mongoose");

const ChapterSchema=new mongoose.Schema(
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
        editors:[
            {
                first:{type:String},
                last:{type:String},
            },
        ],
        bookTitle:{
            type:String,    
        },
        publishedOn:{
            type:String,
        },
        doi:{
            type:String,
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