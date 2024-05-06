const mongoose=require("mongoose");

const Cat1Record=new mongoose.Schema(
    {
        uid: {
            type: String,
            unique:true,
            required: true,
        },
        type: {
            type: String,
        },
        four1: {
            type: String,
        },
        four21: {
            type: String,
        },
        four22: {
            type: String,
        },
        four23: {
            type: String,
        },
        four3: {
            type: String,
        },
        four4: {
            type: String,
        },
        four5: {
            type: String,
        },
        four6: {
            type: String,
        },
        four7: {
            type: String,
        },
        five1: {
            type: String,
        },
        five2: {
            type: String,
        },
        five3: {
            type: String,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Cat1Record",Cat1Record);

//this is how we can create an model 