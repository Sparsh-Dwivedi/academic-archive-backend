const {capitalize}=require('./service')


const conferenceApa=(conference)=>{ 
    var res="";
    if(conference.authors.length===1){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first).slice(0,1);
    }
    else if(conference.authors.length===2){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first).slice(0,1)+".,&"+capitalize(conference.authors[1].first).slice(0,1)+". "+capitalize(conference.authors[1].last);
    }
    else if(conference.authors.length===3){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first).slice(0,1)+".,"
        capitalize(conference.authors[1].last)+","+capitalize(conference.authors[1].first).slice(0,1)+".,&"
        +capitalize(conference.authors[2].last)+","+capitalize(conference.authors[2].first).slice(0,1);
    }
    else if(conference.authors.length>3){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first).slice(0,1)+".,"
        capitalize(conference.authors[1].last)+","+capitalize(conference.authors[1].first).slice(0,1)+".,"
        +capitalize(conference.authors[2].last)+","+capitalize(conference.authors[2].first).slice(0,1)+"., et al";
    }
    res+=".";
    if(conference.publishedOn) res+="("+conference.publishedOn.slice(0,4)+").";
    res+=capitalize(conference.title)+".";
    if(conference.editors.length) res+="In "
    for(let e=0;e<chapter.editors.size();e++){
        res+=capitalize(chapter.editors[e].first).slice(0,1)+" "+capitalize(chapter.editors[e].last)+","
    }
    res+="(Eds.)";
    if(conference.conferenceTitle)  res+=","+conference.conferenceTitle;
    if(conference.pageRange) res+=" (pp."+conference.pageRange+").";
    if(conference.publisher) res+=conference.publisher+".";
    return res;
}

const conferenceMla=(conference)=>{ 
    var res="";
    if(conference.authors.length===1){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first);
    }
    else if(conference.authors.length===2){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first)+",and "+
        capitalize(conference.authors[1].first)+" "+capitalize(conference.authors[1].last);
    }
    else if(conference.authors.length===3){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first)+","+
        capitalize(conference.authors[1].first)+" "+capitalize(conference.authors[1].last)+",and "+
        capitalize(conference.authors[2].first)+" "+capitalize(conference.authors[2].last);
    }
    else if(conference.authors.length>3){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first)+", et al";
    }
    res+=".";
    res+=capitalize(conference.title)+"."+capitalize(conference.conferenceTitle);
    // if(conference.location) res+=","+conference.location;
    if(conference.editors.length) res+="Edited by "
    for(let e=0;e<chapter.editors.size();e++){
        res+=capitalize(chapter.editors[e].first)+" "+capitalize(chapter.editors[e].last)+","
    }
    if(conference.publisher) res+=conference.publisher+",";
    if(conference.publishedOn) res+=conference.publishedOn.slice(0,4)+",";
    if(conference.pageRange) res+="pp."+conference.pageRange+".";
    return res;
}

const conferenceChicago=(conference)=>{
    var res="";
    if(conference.authors.length===1){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first);
    }
    else if(conference.authors.length===2){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first)+", and "
        +capitalize(conference.authors[1].first)+" "+capitalize(conference.authors[1].last);
    }
    else if(conference.authors.length===3){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first)+","+
        capitalize(conference.authors[1].first)+" "+capitalize(conference.authors[1].last)+", and "
        +capitalize(conference.authors[2].first)+" "+capitalize(conference.authors[2].last);
    }
    else if(conference.authors.length>3){
        res+=capitalize(conference.authors[0].last)+","+capitalize(conference.authors[0].first)+"et al";
    }
    res+=".";
    res+=capitalize(conference.title)+".";
    if(conference.conferenceTitle)   res+="In"+capitalize(conference.conferenceTitle);
    if(conference.editors.length) res+=", Edited by "
    for(let e=0;e<chapter.editors.size();e++){
        res+=capitalize(chapter.editors[e].first)+" "+capitalize(chapter.editors[e].last)+","
    }
    if(conference.pageRange)   res+="."+conference.pageRange+".";
    if(conference.publisher)  res+=conference.publisher+",";
    if(conference.publishedOn) res+=conference.publishedOn.slice(0,4)+".";
    return res;
}

const conferenceVancouver=(conference)=>{
    var res="";
    if(conference.authors.length===1){
        res+=capitalize(conference.authors[0].last)+" "+capitalize(conference.authors[0].first).slice(0,1);
    }
    else if(conference.authors.length===2){
        res+=capitalize(conference.authors[0].last)+" "+capitalize(conference.authors[0].first).slice(0,1)
        +", and "+capitalize(conference.authors[1].first)+" "+capitalize(conference.authors[1].last).slice(0,1);
    }
    else if(conference.authors.length===3){
        res+=capitalize(conference.authors[0].last)+" "+capitalize(conference.authors[0].first).slice(0,1)+","+
        capitalize(conference.authors[1].last)+" "+capitalize(conference.authors[1].first).slice(0,1)+", and "
        +capitalize(conference.authors[2].last)+" "+capitalize(conference.authors[2].first).slice(0,1);
    }
    else if(conference.authors.length>3){
        res+=capitalize(conference.authors[0].last)+" "+capitalize(conference.authors[0].first).slice(0,1)+","+
        capitalize(conference.authors[1].last)+" "+capitalize(conference.authors[1].first).slice(0,1)+","+
        capitalize(conference.authors[2].last)+" "+capitalize(conference.authors[2].first).slice(0,1)+", et al"
    }
    res+=".";
    res+=capitalize(conference.title)+".";
    if(conference.editors.length) res+="In: "
    for(let e=0;e<chapter.editors.size();e++){
        res+=capitalize(chapter.editors[e].first)+" "+capitalize(chapter.editors[e].last)+","
    }
    if(conference.conferenceTitle)   res+=capitalize(conference.conferenceTitle)+".";
    if(conference.publisher)    res+=capitalize(conference.publisher)+",";
    if(conference.publishedOn) res+=conference.publishedOn.slice(0,4)+".";
    if(conference.pageRange)   res+="p"+conference.pageRange+".";
    return res;
}


module.exports ={conferenceApa,conferenceMla,conferenceChicago,conferenceVancouver};