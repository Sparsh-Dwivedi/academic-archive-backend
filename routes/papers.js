const router=require("express").Router();
const Book = require("../models/Book");
const Chapter = require("../models/Chapter");
const Conference = require("../models/Conference");
const Journal = require("../models/Journal");
const { verifyTokenAndAuthorization } = require("./middleware");

//create the paper
router.post("/create/:type",verifyTokenAndAuthorization,async (req,res)=>{
    const type=req.params.type;
    var retVal={};
    if(type==='book'){
        const newBook = new Book(req.body);
        try{
            retVal=await newBook.save(); 
        } catch(err){
            return res.status(500).json("error occur"+err); 
        }
    }
    else if(type==='chapter'){
        const newBookCh = new Chapter(req.body);
        try{
            retVal=await newBookCh.save(); 
        } catch(err){
            return res.status(500).json("error occur"+err);
        }
    }
    else if(type==='journal'){
        const newJournal = new Journal(req.body);
        try{
            retVal=await newJournal.save(); 
        } catch(err){
            return res.status(500).json("error occur"+err); 
        }
    }
    else if(type==='conference'){
        const newConference = new Conference(req.body);
        try{
            retVal=await newConference.save(); 
        } catch(err){
            return res.status(500).json("error occur"+err); 
        }
    }
    return res.status(200).json(retVal);

});

//update the paper
router.post("/update/:type",verifyTokenAndAuthorization,async (req,res)=>{
    const {uid,_id,...others}=req.body;
    const change=others;
    console.log(change)
    if(type==='book'){
        try {
            let prev=await Book.findById(req.body._id);
            if(!prev || prev.uid!=req.body.uid){return res.status(404).send("Unable to update")};
            prev=await Book.findByIdAndUpdate(req.body._id,{$set:change});
            return res.json({"Success":"Updated Successfully below prev"});  
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else if(type==='chapter'){
        try {
            let prev=await Chapter.findById(req.body._id);
            if(!prev || prev.uid!=req.body.uid){return res.status(404).send("Unable to update")};
            prev=await Chapter.findByIdAndUpdate(req.body._id,{$set:change});
            return res.json({"Success":"Updated Successfully below prev"});  
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else if(type==='journal'){
        try {
            let prev=await Journal.findById(req.body._id);
            if(!prev || prev.uid!=req.body.uid){return res.status(404).send("Unable to update")};
            prev=await Journal.findByIdAndUpdate(req.body._id,{$set:change});
            return res.json({"Success":"Updated Successfully below prev"});  
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else if(type==='conference'){
        try {
            let prev=await Conference.findById(req.body._id);
            if(!prev || prev.uid!=req.body.uid){return res.status(404).send("Unable to update")};
            prev=await Conference.findByIdAndUpdate(req.body._id,{$set:change});
            return res.json({"Success":"Updated Successfully below prev"});  
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
     
});

//get the paper of particular user
router.post('/getall/:type',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const type=req.params.type;
        if(type==='book'){
            const ret=await Book.find({uid:req.body._id});
            return res.status(200).json(ret);
        }
        if(type==='chapter'){
            const ret=await Chapter.find({uid:req.body._id});
            return res.status(200).json(ret);
        }
        if(type==='journal'){
            const ret=await Journal.find({uid:req.body._id});
            return res.status(200).json(ret);
        }
        if(type==='conference'){
            const ret=await Conference.find({uid:req.body._id});
            return res.status(200).json(ret);
        }
    } catch (error) {  
        return res.status(500).json(error);
    }
});

module.exports=router;
