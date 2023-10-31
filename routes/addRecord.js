const router=require("express").Router();
const { citePaper } = require("../citation/service");
const Book = require("../models/Book");
const Btp = require("../models/Btp");
const Chapter = require("../models/Chapter");
const Conference = require("../models/Conference");
const Fdp = require("../models/Fdp");
const Journal = require("../models/Journal");
const Mtp = require("../models/Mtp");
const Society = require("../models/Society");
const Stc = require("../models/Stc");
const Talk = require("../models/Talk");
const { verifyTokenAndAuthorization } = require("./middleware");

//create the paper
router.post("/create/:type",verifyTokenAndAuthorization,async (req,res)=>{
    const type=req.params.type;
    var retVal={};
    const {_id,...rest}=req.body;
    const adderUid=_id;
    const record={...rest};
    if(type==='btp'){
        const newBtp = new Btp({uid:adderUid,...record});
        try{
            retVal=await newBtp.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='mtp'){
        const newMtp = new Mtp({uid:adderUid,...record});
        try{
            retVal=await newMtp.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='society'){
        const newSociety = new Society({uid:adderUid,...record});
        try{
            retVal=await newSociety.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='stc'){
        const newStc = new Stc({uid:adderUid,...record});
        try{
            retVal=await newStc.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='talk'){
        const newTalk = new Talk({uid:adderUid,...record});
        try{
            retVal=await newTalk.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='fdp'){
        const newFdp = new Fdp({uid:adderUid,...record});
        try{
            retVal=await newFdp.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else res.status(404).json({message:'no matching type'});
    
    return res.status(200).json({message:'saved successfully',paper:retVal});

});

//update the paper
router.post("/update/:type",verifyTokenAndAuthorization,async (req,res)=>{
    const {_id,pid,...others}=req.body; //_id is userid & pid is paper id
    const change=others;
    const type=req.params.type
    if(type==='book'){
        try {
            let prev=await Book.findById(req.body.pid);
            if(!prev || !(prev.uid.includes(req.body._id))){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Book.findByIdAndUpdate(req.body.pid,{$set:change});
            return res.status(200).json({message:"Paper Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='chapter'){
        try {
            let prev=await Chapter.findById(req.body.pid);
            if(!prev || !(prev.uid.includes(req.body._id))){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Chapter.findByIdAndUpdate(req.body.pid,{$set:change});
            return res.status(200).json({message:"Updated Successfully below prev"});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='journal'){
        try {
            let prev=await Journal.findById(req.body.pid);
            if(!prev || !(prev.uid.includes(req.body._id))){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Journal.findByIdAndUpdate(req.body.pid,{$set:change});
            return res.status(200).json({message:"Paper Updated Successfully"});  
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else if(type==='conference'){
        try {
            let prev=await Conference.findById(req.body.pid);
            if(!prev || !(prev.uid.includes(req.body._id))){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Conference.findByIdAndUpdate(req.body.pid,{$set:change});
            return res.status(200).json({message:"Paper Updated Successfully"});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else res.status(404).json({message:'no matching type'});
    
});

//get the paper of particular user
router.post('/getall/:type',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const type=req.params.type;
        const requesterUid=req.body._id;
        if(type==='book'){
            const ret=await Book.find({uid:requesterUid});
            return res.status(200).json(ret);
        }
        else if(type==='chapter'){
            const ret=await Chapter.find({uid:requesterUid});
            return res.status(200).json(ret);
        }
        else if(type==='journal'){
            const ret=await Journal.find({uid:requesterUid});
            return res.status(200).json(ret);
        }
        else if(type==='conference'){
            const ret=await Conference.find({uid:requesterUid});
            return res.status(200).json(ret);
        }
        else res.status(404).json({message:'no matching paper type'});

    } catch (error) {  
        return res.status(500).json({message:error});
    }
});

router.post('/search/:type/:cite',async(req,res)=>{
    try {
        console.log(req.body)
        const query=req.body.query?req.body.query:'';
        const start=req.body.start?req.body.start:"1947-08-15";
        const uid=req.body.uid?req.body.uid:null;
        const department=req.body.department?req.body.department:null;
        const end=req.body.end?req.body.end:"2025-01-01";
        const type=req.params.type;
        const cite=req.params.cite;
        var prev=[];
        if(type==='chapter'){
            if(uid){
                prev=await Chapter.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "uid": uid},
                      ]
                });
            }
            else if(department){
                prev=await Chapter.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "department": department},
                      ]
                });
            }
        }
        else if(type==='book'){
            if(uid){
                prev=await Book.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "uid": uid},
                      ]
                });
            }
            else if(department){
                prev=await Book.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "department": department},
                      ]
                });
            }
        }
        else if(type==='journal'){
            if(uid){
                prev=await Journal.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "uid": uid},
                      ]
                });
            }
            else if(department){
                prev=await Journal.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "department": department},
                      ]
                });
            }
        }
        else if(type==='conference'){
            if(uid){
                prev=await Conference.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "uid": uid},
                      ]
                });
            }
            else if(department){
                prev=await Conference.find({
                    $and: [
                        {"title":{$regex:query}},
                        { "publishedOn": { $gte: start } },
                        { "publishedOn": { $lte: end } },
                        { "department": department},
                      ]
                });
            }
        }
        console.log(prev) 
        prev.sort(function(b, a) {  //newest first
            return ((a.publishedOn < b.publishedOn) ? -1 : ((a.publishedOn> b.publishedOn) ? 1 : 0));
        })
        const result=citePaper(prev,type,cite);
        if(result.success){
            return res.status(200).json(result.value);
        }
        else{
            return res.status(400).json({message:"Unable to cite the papers"})
        }
    } catch (error) {
        return res.status(500).json({message:error});
    }
});


module.exports=router;
