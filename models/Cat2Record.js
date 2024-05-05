const mongoose=require("mongoose");

const Cat2Record=new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique:true,
        },
        type: {
            type: String,
        },
        cat21: {
            type: String,
        },
        cat22: {
            type: String,
        },
        cat23: {
            type: String,
        },
        cat24: {
            type: String,
        },
        cat25: {
            type: String,
        },
        cat26: {
            type: String,
        },
        cat27: {
            type: String,
        },
        cat28: {
            type: String,
        },
        cat29: {
            type: String,
        },
        cat210: {
            type: String,
        },
        cat211: {
            type: String,
        },
        cat212: {
            type: String,
        },
        cat213: {
            type: String,
        },
        cat214: {
            type: String,
        },
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("Cat2Record",Cat2Record);

//this is how we can create an model 