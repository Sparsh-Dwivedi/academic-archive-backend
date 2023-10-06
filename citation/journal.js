const {capitalize}=require('./service')

const journalApa=(journal)=>{ 
    var res="";
    if(journal.authors.length===1){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first).slice(0,1);
    }
    else if(journal.authors.length===2){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first).slice(0,1)+".,&"+capitalize(journal.authors[1].last)+" "+capitalize(journal.authors[1].first).slice(0,1);
    }
    else if(journal.authors.length===3){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first).slice(0,1)+".,"
        capitalize(journal.authors[1].last)+","+capitalize(journal.authors[1].first).slice(0,1)+".,&"
        +capitalize(journal.authors[2].last)+","+capitalize(journal.authors[2].first).slice(0,1);
    }
    else if(journal.authors.length>3){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first).slice(0,1)+".,"
        capitalize(journal.authors[1].last)+","+capitalize(journal.authors[1].first).slice(0,1)+".,"
        +capitalize(journal.authors[2].last)+","+capitalize(journal.authors[2].first).slice(0,1)+"., et al";
    }
    res+=".";
    res+=capitalize(journal.title)+".";
    if(journal.journalTitle)   res+=capitalize(journal.journalTitle)+',';
    if(journal.volume)  res+=journal.volume;
    if(journal.issue)  res+="("+journal.issue+")";
    if(journal.pageRange)   res+=","+journal.pageRange+".";
    return res;
}

const journalMla=(journal)=>{ 
    var res="";
    if(journal.authors.length===1){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first);
    }
    else if(journal.authors.length===2){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first)+",and "+
        capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last);
    }
    else if(journal.authors.length===3){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first)+","+
        capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last)+",and "+
        capitalize(journal.authors[2].first)+" "+capitalize(journal.authors[2].last);
    }
    else if(journal.authors.length>3){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first)+", et al";
    }
    res+=".";
    res+=capitalize(journal.title)+"."+capitalize(journal.journalTitle);
    if(journal.volume) res+=", vol."+journal.volume;
    if(journal.issue)   res+=", "+journal.issue+"issue"
    if(journal.publishedOn) res+=","+journal.publishedOn.slice(0,4);
    if(journal.pageRange) res+=", pp."+journal.pageRange+".";
    if(journal.doi) res+=journal.doi+".";
    return res;
}

const journalChicago=(journal)=>{
    var res="";
    if(journal.authors.length===1){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first);
    }
    else if(journal.authors.length===2){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first)+", and "
        +capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last);
    }
    else if(journal.authors.length===3){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first)+","+
        capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last)+", and "
        +capitalize(journal.authors[2].first)+" "+capitalize(journal.authors[2].last);
    }
    else if(journal.authors.length>3){
        res+=capitalize(journal.authors[0].last)+","+capitalize(journal.authors[0].first)+"et al";
    }
    res+=".";
    res+=capitalize(journal.title)+".";
    if(journal.journalTitle)   res+=capitalize(journal.journalTitle);
    if(journal.volume)  res+=journal.volume+",";
    if(journal.issue)  res+="no. "+journal.issue;
    if(journal.publishedOn) res+="("+journal.publishedOn+")";
    if(journal.pageRange)   res+=":"+journal.pageRange+".";
    return res;
}

const journalVancouver=(journal)=>{
    var res="";
    if(journal.authors.length===1){
        res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1);
    }
    else if(journal.authors.length===2){
        res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1)
        +", and "+capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last).slice(0,1);
    }
    else if(journal.authors.length===3){
        res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1)+","+
        capitalize(journal.authors[1].last)+" "+capitalize(journal.authors[1].first).slice(0,1)+", and "
        +capitalize(journal.authors[2].last)+" "+capitalize(journal.authors[2].first).slice(0,1);
    }
    else if(journal.authors.length>3){
        res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1)+","+
        capitalize(journal.authors[1].last)+" "+capitalize(journal.authors[1].first).slice(0,1)+","+
        capitalize(journal.authors[2].last)+" "+capitalize(journal.authors[2].first).slice(0,1)+", et al"
    }
    res+=".";
    res+=capitalize(journal.title)+".";
    if(journal.journalTitle)   res+=capitalize(journal.journalTitle)+".";
    if(journal.publishedOn) res+=journal.publishedOn.slice(0,4)+";";
    if(journal.volume)  res+=journal.volume;
    if(journal.issue)   res+="("+journal.issue+")"
    if(journal.pageRange)   res+=":"+journal.pageRange+".";
    return res;
}


module.exports ={journalApa,journalMla,journalChicago,journalVancouver};