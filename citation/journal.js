// const {capitalize}=require('./service')
const capitalize=(str)=>{
    return str[0].toUpperCase()+str.slice(1);
}
const journalApa=(journal)=>{ 
    try{
        var res="";
        if(journal.authors.length===1){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first).slice(0,1);
        }
        else if(journal.authors.length===2){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first).slice(0,1)+". ,& "+capitalize(journal.authors[1].last)+" "+capitalize(journal.authors[1].first).slice(0,1);
        }
        else if(journal.authors.length===3){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first).slice(0,1)+". ,"+capitalize(journal.authors[1].last)+" ,"+capitalize(journal.authors[1].first).slice(0,1)+". ,& "
            +capitalize(journal.authors[2].last)+" ,"+capitalize(journal.authors[2].first).slice(0,1);
        }
        else if(journal.authors.length>3){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first).slice(0,1)+". ,"+
            capitalize(journal.authors[1].last)+" ,"+capitalize(journal.authors[1].first).slice(0,1)+". ,"
            +capitalize(journal.authors[2].last)+" ,"+capitalize(journal.authors[2].first).slice(0,1)+". ,et al";
        }
        res+=". ";
        res+=capitalize(journal.title)+". ";
        if(journal.journalTitle)   res+=capitalize(journal.journalTitle)+', ';
        if(journal.volume)  res+=journal.volume;
        if(journal.issue)  res+="("+journal.issue+")";
        if(journal.pageRange)   res+=" ,"+journal.pageRange+". ";
        if(journal.doi)   res+=journal.doi+". ";

        return {success:1,value:res};
    } catch (error) {
        return {success:0,value:error}
    }
}

const journalMla=(journal)=>{
    try{
        var res="";
        if(journal.authors.length===1){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first);
        }
        else if(journal.authors.length===2){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first)+" ,and "+
            capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last);
        }
        else if(journal.authors.length===3){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first)+" ,"+
            capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last)+" ,and "+
            capitalize(journal.authors[2].first)+" "+capitalize(journal.authors[2].last);
        }
        else if(journal.authors.length>3){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first)+" ,et al";
        }
        res+=". ";
        res+=capitalize(journal.title)+". "+capitalize(journal.journalTitle);
        if(journal.volume) res+=" , vol."+journal.volume;
        if(journal.issue)   res+=" , "+journal.issue+"issue"
        if(journal.publishedOn) res+=", "+journal.publishedOn.slice(0,4);
        if(journal.pageRange) res+=", pp."+journal.pageRange+". ";
        if(journal.doi) res+=journal.doi+".";
        return {success:1,value:res};
    } catch (error) {
        return {success:0,value:error}
    }
}

const journalChicago=(journal)=>{
    try{
        var res="";
        if(journal.authors.length===1){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first);
        }
        else if(journal.authors.length===2){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first)+" ,and "
            +capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last);
        }
        else if(journal.authors.length===3){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first)+" ,"+
            capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last)+" ,and "
            +capitalize(journal.authors[2].first)+" "+capitalize(journal.authors[2].last);
        }
        else if(journal.authors.length>3){
            res+=capitalize(journal.authors[0].last)+" ,"+capitalize(journal.authors[0].first)+" et al";
        }
        res+=". ";
        res+=capitalize(journal.title)+". ";
        if(journal.journalTitle)   res+=capitalize(journal.journalTitle)+", ";
        if(journal.volume)  res+=journal.volume+", ";
        if(journal.issue)  res+="no. "+journal.issue;
        if(journal.publishedOn) res+=" ("+journal.publishedOn+")";
        if(journal.pageRange)   res+=":"+journal.pageRange+". ";
        if(journal.doi)   res+=journal.doi+".";
        return {success:1,value:res};
    } catch (error) {
        return {success:0,value:error}
    }
}

const journalVancouver=(journal)=>{
    try{
        var res="";
        if(journal.authors.length===1){
            res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1);
        }
        else if(journal.authors.length===2){
            res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1)
            +" ,and "+capitalize(journal.authors[1].first)+" "+capitalize(journal.authors[1].last).slice(0,1);
        }
        else if(journal.authors.length===3){
            res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1)+" ,"+
            capitalize(journal.authors[1].last)+" "+capitalize(journal.authors[1].first).slice(0,1)+" ,and "
            +capitalize(journal.authors[2].last)+" "+capitalize(journal.authors[2].first).slice(0,1);
        }
        else if(journal.authors.length>3){
            res+=capitalize(journal.authors[0].last)+" "+capitalize(journal.authors[0].first).slice(0,1)+" ,"+
            capitalize(journal.authors[1].last)+" "+capitalize(journal.authors[1].first).slice(0,1)+" ,"+
            capitalize(journal.authors[2].last)+" "+capitalize(journal.authors[2].first).slice(0,1)+" ,et al"
        }
        res+=". ";
        res+=capitalize(journal.title)+". ";
        if(journal.journalTitle)   res+=capitalize(journal.journalTitle)+". ";
        if(journal.publishedOn) res+=journal.publishedOn.slice(0,4)+"; ";
        if(journal.volume)  res+=journal.volume;
        if(journal.issue)   res+="("+journal.issue+") "
        if(journal.pageRange)   res+=":"+journal.pageRange+". ";
        if(journal.doi)   res+=journal.doi+".";
        return {success:1,value:res};
    } catch (error) {
        return {success:0,value:error}
    }
}


module.exports ={journalApa,journalMla,journalChicago,journalVancouver};