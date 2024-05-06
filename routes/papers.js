const router=require("express").Router();
const { citePaper, extractFields, capitalize } = require("../citation/service");
const Book = require("../models/Book");
const Chapter = require("../models/Chapter");
const Conference = require("../models/Conference");
const Fdp = require("../models/Fdp");
const Journal = require("../models/Journal");
const Material = require("../models/Material");
const Project = require("../models/Project");
const Cat1Record = require("../models/Cat1Record")
const Cat2Record = require("../models/Cat2Record")
const Stc = require("../models/Stc");
const TeachingDuty = require("../models/TeachingDuty");
const User = require("../models/User");
const consultancy = require("../models/consultancy");
const { verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./middleware");

//create the paper
router.post("/create/:type",verifyTokenAndAuthorization,async (req,res)=>{
    const type=req.params.type;
    var retVal={};
    const {_id,...rest}=req.body;
    const adderUid=_id;
    const paper={...rest};
    if(type==='book'){
        const oldBook=await Book.find({doi:paper.doi});
        if(oldBook.length){
            var users=oldBook[0].uid;
            const pid=oldBook[0]._id;
            if(users.find(ele=>ele===adderUid)){
                return res.status(201).json({message:'Paper Already Exist'})
            }
            else {
                try{
                    retVal=await Book.updateOne({_id:pid},{$push:{uid:adderUid}});
                } catch(err){
                    return res.status(500).json({message:err});
                }
            }
        }
        else{   //new book
            const newBook = new Book({uid:adderUid,...paper});
            try{
                retVal=await newBook.save(); 
            } catch(err){
                return res.status(500).json({message:err}); 
            }
        }
    }
    else if(type==='chapter'){
        const oldChapter=await Chapter.find({doi:paper.doi});
        if(oldChapter.length){
            var users=oldChapter[0].uid;
            const pid=oldChapter[0]._id;
            if(users.find(ele=>ele===adderUid)){
                return res.status(201).json({message:'Paper Already Exist'})
            }
            else {  //paper exist but new adder
                try{
                    retVal=await Chapter.updateOne({_id:pid},{$push:{uid:adderUid}});
                } catch(err){
                    return res.status(500).json({message:err});
                }
            }
        }
        else{   //new book
            const newChapter = new Chapter({uid:adderUid,...paper});
            try{
                retVal=await newChapter.save(); 
            } catch(err){
                return res.status(500).json({message:err}); 
            }
        }
    }
    else if(type==='journal'){
        const oldJournal=await Journal.find({doi:paper.doi});
        if(oldJournal.length){
            var users=oldJournal[0].uid;
            const pid=oldJournal[0]._id;
            if(users.find(ele=>ele===adderUid)){
                return res.status(201).json({message:'Paper Already Exist'})
            }
            else {  //paper exist but new adder
                try{
                    retVal=await Journal.updateOne({_id:pid},{$push:{uid:adderUid}});
                } catch(err){
                    return res.status(500).json({message:err});
                }
            }
        }
        else{   //new book
            const newJournal = new Journal({uid:adderUid,...paper});
            try{
                retVal=await newJournal.save(); 
            } catch(err){
                return res.status(500).json({message:err}); 
            }
        }
    }
    else if(type==='conference'){
        const oldConference=await Conference.find({doi:paper.doi});
        if(oldConference.length){
            var users=oldConference[0].uid;
            const pid=oldConference[0]._id;
            if(users.find(ele=>ele===adderUid)){
                return res.status(201).json({message:'Paper Already Exist'})
            }
            else {  //paper exist but new adder
                try{
                    retVal=await Conference.updateOne({_id:pid},{$push:{uid:adderUid}});
                } catch(err){
                    return res.status(500).json({message:err});
                }
            }
        }
        else{   //new 
            const newConference = new Conference({uid:adderUid,...paper});
            try{
                retVal=await newConference.save(); 
            } catch(err){
                return res.status(500).json({message:err}); 
            }
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
            return res.status(200).json({message:"Paper Updated Successfully",paper:prev});  
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

router.post('/acr/1/a1',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const uid=req.user._id?req.user._id:null;
        var prev = await TeachingDuty.find({uid:uid});
        var result = [];
        prev.forEach(ele=>{
            var modeofteaching = ele.mode1 + " (July-Dec), "+ele.mode2+" (Jan-May)";
            var hoursofteaching = ele.hours1 + " (July-Dec), "+ele.hours2+" (Jan-May)";
            var doc =[ele.year,ele.classes,ele.courses1,ele.courses2,modeofteaching,16,hoursofteaching,ele.taken+"%",ele.excessHours];
            result.push(doc);
        })
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/1/a2',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const uid=req.user._id?req.user._id:null;
        var prev = await Material.find({uid:uid});
        var result = [];
        prev.forEach(ele=>{
            var doc =[ele.classes,ele.course,ele.consulted,ele.prescribed,ele.additional];
            result.push(doc);
        })
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/1/a3',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const uid=req.user._id?req.user._id:null;
        var prev = await Cat1Record.findOne({uid:uid});
        var result = [];
        result.push(Math.min(prev.four1*5,10))
        result.push(Math.min(10,(prev.four21+prev.four22+prev.four23)*5))
        result.push(Math.min(prev.four3*5,10))
        result.push(Math.min(prev.four4*5,10))
        result.push(Math.min(prev.four5*5,10))
        result.push(Math.min(prev.four6*5,10))
        result.push(Math.min(prev.four7*5,10))
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error});
    }
})

router.post('/acr/1/a4',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const uid=req.user._id?req.user._id:null;
        var prev = await Cat1Record.findOne({uid:uid});
        var result = [prev.five1,prev.five2,prev.five3];
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/2/a1',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const uid=req.user._id?req.user._id:null;
        var prev = await Cat2Record.findOne({uid:uid});
        var result = {
            one:[parseInt(prev.cat21),parseInt(prev.cat22),parseInt(prev.cat23),parseInt(prev.cat24)],
            two:[parseInt(prev.cat25),parseInt(prev.cat26),parseInt(prev.cat27),parseInt(prev.cat28),parseInt(prev.cat29)],
            three:[parseInt(prev.cat210),parseInt(prev.cat211),parseInt(prev.cat212),parseInt(prev.cat213),parseInt(prev.cat214)],
        };
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/a1',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        var prev=await Journal.find({
            $and: [
                { "publishedOn": { $gte: start } },
                { "publishedOn": { $lte: end } },
                { "uid": uid},
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.journalTitle+", vol. "+ele.volume+", no."+
            ele.issue+","+ele.publishedOn.slice(4)+",pp."+ele.pageRange;
            var c=ele.issn;
            var d=ele.refType;
            var e=ele.authors.length-1;
            var mainAuthor=ele.authors[0].first+" "+(ele.authors[0].middle?ele.authors[0].middle+" ":"")+ele.authors[0].last;
            var f=(ele.authors[0].first==user.name.split(" ")[0] && ele.authors[0].first==user.name.split(" ")[0])?'Yes':'No';
            var g=(d=='Refered')?15:10;
            doc={a,b,c,d,e,f,g};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/a2',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        var prev=await Conference.find({
            $and: [
                { "publishedOn": { $gte: start } },
                { "publishedOn": { $lte: end } },
                { "uid": uid},
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.conferenceTitle+","+ele.publishedOn.slice(4)+",pp."+ele.pageRange;
            var c=ele.nationality;
            var d=ele.authors.length-1;
            var e=(ele.authors[0].first==user.name.split(" ")[0] 
                && ele.authors[0].first==user.name.split(" ")[0])?'Yes':'No';
            var f=(c=="National")?5:10;
            doc={a,b,c,d,e,f};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/b1',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        var prev=await Book.find({
            $and: [
                { "publishedOn": { $gte: start } },
                { "publishedOn": { $lte: end } },
                { "uid": uid},
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev.forEach(ele => {
            var doc=[];
            var a=ele.title+",pp."+ele.pageRange;
            var b=ele.bookType;
            var c=ele.publisher+","+ele.isbn;
            var d=(ele.refType=="Refered")?"Yes":"No";
            var e=(ele.authors.length-1)+",Published on:"+ele.publishedOn;
            var f=ele.nationality;
            var g=(f=="National")?25:(f=="International"?50:15);
            doc={a,b,c,d,e,f,g};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/b2',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        var prev=await Chapter.find({
            $and: [
                { "publishedOn": { $gte: start } },
                { "publishedOn": { $lte: end } },
                { "uid": uid},
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev.forEach(ele => {
            var doc=[];
            var a=ele.title+",pp."+ele.pageRange;
            var b=ele.bookTitle+", "+capitalize(ele.editors[0].last.slice(0,1))+
            ". "+capitalize(ele.editors[0].first)+", "+ele.publisher;//yha editors dalne hai
            var c=ele.isbn;
            var d=(ele.refType=="Refered")?"Yes":"No";
            var e=(ele.authors.length-1)+",Published on:"+ele.publishedOn;
            var f=(ele.authors[0].first==user.name.split(" ")[0] 
            && ele.authors[0].first==user.name.split(" ")[0])?'Yes':'No';
            var g=(f=="International"?10:5);
            doc={a,b,c,d,e,f,g};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/c12',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        const prev1=await Project.find({
            $and: [
                { "uid": uid},
                {"status":"Ongoing"}
              ]
        });
        const prev2=await consultancy.find({
            $and: [
                { "uid": uid},
                {"status":"Ongoing"}
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev1.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.awardingAgency;
            var c=ele.duration;
            var d=ele.cost;
            var e="15"; //need to make is check
            doc={a,b,c,d,e};
            result.push(doc);
        });
        prev2.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.awardingAgency;
            var c=ele.duration;
            var d=ele.cost;
            var e="15"; //need to make is check
            doc={a,b,c,d,e};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/c34',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        const prev1=await Project.find({
            $and: [
                { "uid": uid},
                {"status":"Completed"}
              ]
        });
        const prev2=await consultancy.find({
            $and: [
                { "uid": uid},
                {"status":"Completed"}
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev1.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.awardingAgency;
            var c=ele.duration;
            var d=ele.cost;
            var e=ele.patent;
            var f="15"; //need to make is check
            doc={a,b,c,d,e,f};
            result.push(doc);
        });
        prev2.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.awardingAgency;
            var c=ele.duration;
            var d=ele.cost;
            var e=ele.patent;
            var f="15"; //need to make is check
            doc={a,b,c,d,e,f};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/c34',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        const prev1=await Project.find({
            $and: [
                { "uid": uid},
                {"status":"Completed"}
              ]
        });
        const prev2=await consultancy.find({
            $and: [
                { "uid": uid},
                {"status":"Completed"}
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev1.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.awardingAgency;
            var c=ele.duration;
            var d=ele.cost;
            var e=ele.patent;
            var f="15"; //need to make is check
            doc={a,b,c,d,e,f};
            result.push(doc);
        });
        prev2.forEach(ele => {
            var doc=[];
            var a=ele.title;
            var b=ele.awardingAgency;
            var c=ele.duration;
            var d=ele.cost;
            var e=ele.patent;
            var f="15"; //need to make is check
            doc={a,b,c,d,e,f};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/acr/3/e1',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const start=req.body.start?req.body.start:"1947-08-15";
        const end=req.body.end?req.body.end:"2030-01-01";
        const uid=req.user._id?req.user._id:null;
        const prev1=await Fdp.find({
            $and: [
                { "uid": uid},
                { "startDate": { $gte: start } },
                { "endDate": { $lte: end } },
              ]
        });
        const prev2=await Stc.find({
            $and: [
                { "uid": uid},
                { "startDate": { $gte: start } },
                { "endDate": { $lte: end } },
              ]
        });
        var user =await User.findById(req.user._id)
        var result=[];
        prev1.forEach(ele => {
            var doc=[];
            var a=ele.name;
            var b=ele.duration;
            var c=ele.organiser;
            var d=ele.duration>2?20:10;
            doc={a,b,c,d};
            result.push(doc);
        });
        prev2.forEach(ele => {
            var doc=[];
            var a=ele.name;
            var b=ele.duration;
            var c=ele.organiser;
            var d=ele.duration>2?20:10;
            doc={a,b,c,d};
            result.push(doc);
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error});
    }
})

router.post('/search/:type/:cite',verifyTokenAndAdmin,async(req,res)=>{
    try {
        // console.log(req.body)
        const query=req.body.query?req.body.query:'';
        const start=req.body.start?req.body.start:"1947-08-15";
        const uid=req.body.uid?req.body.uid:null;
        const department=req.body.department?req.body.department:null;
        const end=req.body.end?req.body.end:"2030-01-01";
        const type=req.params.type;
        const cite=req.params.cite;
        const fields=req.body.fields;
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
        // console.log(prev) 
        prev.sort(function(b, a) {  //newest first
            return ((a.publishedOn < b.publishedOn) ? -1 : ((a.publishedOn> b.publishedOn) ? 1 : 0));
        })
        var result;
        if(cite==='manualfields')   result=extractFields(prev,fields);
        else result=citePaper(prev,type,cite);
        if(result.success){
            return res.status(200).json(result.value);  //value is comming yearwise sorted
        }
        else{
            return res.status(400).json({message:"Unable to cite the papers"})
        }
    } catch (error) {
        console.log('erorr')
        return res.status(500).json({message:error});
    }
});

module.exports=router;
