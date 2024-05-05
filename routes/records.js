const router=require("express").Router();
const Btp = require("../models/Btp");
const Fdp = require("../models/Fdp");
const User =require("../models/User");
const Mtp = require("../models/Mtp");
const Patents = require("../models/Patents");
const Phd = require("../models/Phd");
const Project = require("../models/Project");
const Society = require("../models/Society");
const Stc = require("../models/Stc");
const Talk = require("../models/Talk");
const consultancy = require("../models/consultancy");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./middleware");
const TeachingDuty = require("../models/TeachingDuty");
const Material = require("../models/Material");
const Cat2Record = require("../models/Cat2Record");
const Cat1Record = require("../models/Cat1Record");

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
    else if(type==='phd'){
        const newPhd = new Phd({uid:adderUid,...record});
        try{
            retVal=await newPhd.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='project'){
        const newProject = new Project({uid:adderUid,...record});
        try{
            retVal=await newProject.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='consultancy'){
        const newConsultancy = new consultancy({uid:adderUid,...record});
        try{
            retVal=await newConsultancy.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='patent'){
        const newPatent = new Patents({uid:adderUid,...record});
        try{
            retVal=await newPatent.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='teachingduty'){
        const newDuty = new TeachingDuty({uid:adderUid,...record});
        try{
            retVal=await newDuty.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='material'){
        const newDuty = new Material({uid:adderUid,...record});
        try{
            retVal=await newDuty.save(); 
        } catch(err){
            return res.status(500).json({message:err}); 
        }
    }
    else if(type==='Cat1Record'){
        try {
            let prev=await Cat1Record.findOne({uid:adderUid}); 
            if(!prev){
                const newDuty = new Cat1Record({uid:adderUid,...record});
                retVal=await newDuty.save();
            }
            else {
                retVal=await Cat1Record.findByIdAndUpdate(prev._id.toString(),{$set:{uid:adderUid,...record}})
            }
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='Cat2Record'){
        try {
            let prev=await Cat2Record.findOne({uid:adderUid}); 
            if(!prev){
                const newDuty = new Cat2Record({uid:adderUid,...record});
                retVal=await newDuty.save();
            }
            else {
                retVal=await Cat2Record.findByIdAndUpdate(prev._id.toString(),{$set:{uid:adderUid,...record}})
            }
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else res.status(404).json({message:'no matching type'});

    return res.status(200).json({message:'saved successfully',record:retVal});

});

//update the paper
router.post("/update/:type",verifyTokenAndAuthorization,async (req,res)=>{
    const {_id,id,...others}=req.body; //_id is userid & id is record id
    const change=others;
    const type=req.params.type
    if(type==='btp'){
        try {
            let prev=await Btp.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Btp.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='mtp'){
        try {
            let prev=await Mtp.findById(id);
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Mtp.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='society'){
        try {
            let prev=await Society.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Society.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='stc'){
        try {
            let prev=await Stc.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Stc.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='talk'){
        try {
            let prev=await Talk.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Talk.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='fdp'){
        try {
            let prev=await Fdp.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Fdp.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='phd'){
        try {
            let prev=await Phd.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Phd.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='project'){
        try {
            let prev=await Project.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Project.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='consultancy'){
        try {
            let prev=await consultancy.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await consultancy.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='patent'){
        try {
            let prev=await Patents.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Patents.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='teachingduty'){
        try {
            let prev=await TeachingDuty.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await TeachingDuty.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='material'){
        try {
            let prev=await Material.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Material.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='Cat1Record'){
        try {
            let prev=await Cat1Record.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Cat1Record.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else if(type==='Cat2Record'){
        try {
            let prev=await Cat2Record.findById(id); 
            if(!prev || prev.uid!=_id){
                return res.status(404).send({message:"Unable to update"})
            };
            prev=await Cat2Record.findByIdAndUpdate(id,{$set:change});
            return res.status(200).json({message:"Record Updated Successfully "});  
        }
        catch (error) {
            return res.status(500).json({message:error});
        }
    }
    else res.status(404).json({message:'no matching type'});

    return res.status(200).json({message:'saved successfully',record:retVal});
    
});

//get the paper of particular user
router.post('/getall/:type',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const type=req.params.type;
        const requesterUid=req.body._id;
        if(type==='btp'){
            try {
                const ret=await Btp.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='mtp'){
            try {
                const ret=await Mtp.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='society'){
            try {
                const ret=await Society.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='stc'){
            try {
                const ret=await Stc.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='talk'){
            try {
                const ret=await Talk.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='fdp'){
            try {
                const ret=await Fdp.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='patent'){
            try {
                const ret=await Patents.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='project'){
            try {
                const ret=await Project.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='consultancy'){
            try {
                const ret=await consultancy.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='phd'){
            try {
                const ret=await Phd.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='teachingduty'){
            try {
                const ret=await TeachingDuty.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='material'){
            try {
                const ret=await Material.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='Cat1Record'){
            try {
                const ret=await Cat1Record.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else if(type==='Cat2Record'){
            try {
                const ret=await Cat2Record.find({uid:requesterUid});
                return res.status(200).json(ret);
            }
            catch (error) {
                return res.status(500).json({message:error});
            }
        }
        else res.status(404).json({message:'no matching type'});

    } catch (error) {  
        return res.status(500).json({message:error});
    }
});

router.post('/search/:type',verifyTokenAndAdmin,async(req,res)=>{
    try {
        // console.log(req.body)
        const uid=req.body.uid?req.body.uid:null;
        const department=req.body.department?req.body.department:null;
        const type=req.params.type;
        var prev=[];
        if(type==='btp'){
            if(uid){
                prev=await Btp.find({
                        $and: [
                            { "year": { $gte: req.body.start?req.body.start:"1947" } },
                            { "year": { $lte: req.body.end?req.body.end:"2025" } },
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.year < b.year) ? -1 : ((a.year> b.year) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let project=await Btp.find({
                        $and: [
                            { "year": { $gte: req.body.start?req.body.start:"1947" } },
                            { "year": { $lte: req.body.end?req.body.end:"2025" } },
                            { "uid": ele._id},
                          ],
                    });
                    project.sort(function(b, a) {  //newest first
                        return ((a.year < b.year) ? -1 : ((a.year> b.year) ? 1 : 0));
                    })
                    project.forEach(proj=>{
                        prev.push({facultyName:ele.name,...proj._doc})
                    })
                }
            }
        }
        else if(type==='mtp'){
            if(uid){
                prev=await Mtp.find({
                        $and: [
                            { "year": { $gte: req.body.start?req.body.start:"1947" } },
                            { "year": { $lte: req.body.end?req.body.end:"2025" } },
                            { "uid": req.body.uid?req.body.uid:''},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.year < b.year) ? -1 : ((a.year> b.year) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let project=await Mtp.find({
                        $and: [
                            { "year": { $gte: req.body.start?req.body.start:"1947" } },
                            { "year": { $lte: req.body.end?req.body.end:"2025" } },
                            { "uid": ele._id},
                          ],
                    });
                    project.sort(function(b, a) {  //newest first
                        return ((a.year < b.year) ? -1 : ((a.year> b.year) ? 1 : 0));
                    })
                    project.forEach(proj=>{
                        prev.push({facultyName:ele.name,...proj._doc})
                    })
                }
            }
        }
        else if(type==='phd'){
            if(uid){
                prev=await Phd.find({
                        $and: [
                            // { "year": { $gte: req.body.start?req.body.start:"1947" } },
                            // { "year": { $lte: req.body.end?req.body.end:"2025" } },
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.enrolmentDate < b.enrolmentDate) ? -1 : ((a.enrolmentDate> b.enrolmentDate) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Phd.find({
                        $and: [
                            // { "year": { $gte: req.body.start?req.body.start:"1947" } },
                            // { "year": { $lte: req.body.end?req.body.end:"2025" } },
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.enrolmentDate < b.enrolmentDate) ? -1 : ((a.enrolmentDate> b.enrolmentDate) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='fdp'){
            if(uid){
                prev=await Fdp.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.startDate < b.startDate) ? -1 : ((a.startDate> b.startDate) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Fdp.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.startDate < b.startDate) ? -1 : ((a.startDate> b.startDate) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='stc'){
            if(uid){
                prev=await Stc.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.startDate < b.startDate) ? -1 : ((a.startDate> b.startDate) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Stc.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.startDate < b.startDate) ? -1 : ((a.startDate> b.startDate) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='society'){
            if(uid){
                prev=await Society.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.societyName < b.societyName) ? -1 : ((a.societyName> b.societyName) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Society.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.societyName < b.societyName) ? -1 : ((a.societyName> b.societyName) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='talk'){
            if(uid){
                prev=await Talk.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.startDate < b.startDate) ? -1 : ((a.startDate> b.startDate) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Fdp.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.startDate < b.startDate) ? -1 : ((a.startDate> b.startDate) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='project'){
            if(uid){
                prev=await Project.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.title < b.title) ? -1 : ((a.title> b.title) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Project.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.title < b.title) ? -1 : ((a.title> b.title) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='consultancy'){
            if(uid){
                prev=await consultancy.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.title < b.title) ? -1 : ((a.title> b.title) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await consultancy.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  
                        return ((a.title < b.title) ? -1 : ((a.title> b.title) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else if(type==='patent'){
            if(uid){
                prev=await Patents.find({
                        $and: [
                            { "uid": uid},
                          ],
                });
                prev.sort(function(b, a) {  //newest first
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
            }
            else if(department){
                var faculty=await User.find({department:department},{ name: 1, _id: 1 })
                faculty.sort(function(a, b) {  //alphabetically sorted
                    return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0));
                })
                //get all the faculty of this department alphabetically sorted
                for(const ele of faculty){
                    let record=await Patents.find({
                        $and: [
                            { "uid": ele._id},
                          ],
                    });
                    record.sort(function(b, a) {  //newest first
                        return ((a.name < b.name) ? -1 : ((a.name> b.name) ? 1 : 0))
                    })
                    record.forEach(r=>{
                        prev.push({facultyName:ele.name,...r._doc})
                    })
                }
            }
        }
        else res.status(404).json({message:'no matching type'});

        return res.status(200).json(prev);

    } catch (error) {
        return res.status(500).json({message:error});
    }
});


module.exports=router;
