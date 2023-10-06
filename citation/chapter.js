// import { capitalize } from "./service";

const capitalize=(str)=>{
    if(!str || str.length==1 )  return str;
    return str[0].toUpperCase()+str.slice(1);
}
const apa=(chapter)=>{ 
    var res="";
    if(chapter.authors.length===1){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first).slice(0,1);
    }
    else if(chapter.authors.length===2){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first).slice(0,1)+".,&"+capitalize(chapter.authors[1].first).slice(0,1)+" "+capitalize(chapter.authors[1].last);
    }
    else if(chapter.authors.length===3){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first).slice(0,1)+".,"
        capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first).slice(0,1)+".,&"
        +capitalize(chapter.authors[1].last)+","+capitalize(chapter.authors[1].first).slice(0,1);
    }
    else if(chapter.authors.length>3){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first).slice(0,1)+".,"
        capitalize(chapter.authors[1].last)+","+capitalize(chapter.authors[1].first).slice(0,1)+".,"
        +capitalize(chapter.authors[2].last)+","+capitalize(chapter.authors[2].first).slice(0,1)+"., et al";
    }
    res+=".";
    res+=capitalize(chapter.title)+".";
    if(chapter.edition) res+="In Edition ("+chapter.edition+"),";
    if(chapter.bookTitle)   res+=chapter.bookTitle;
    if(chapter.pageRange)   res+=" (pp."+chapter.pageRange+").";
    if(chapter.publisher) res+=capitalize(chapter.publisher)+"."
    return res;
}

const mla=(chapter)=>{ 
    var res="";
    if(chapter.authors.length===1){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first);
    }
    else if(chapter.authors.length===2){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first)+",and "+
        capitalize(chapter.authors[1].first)+" "+capitalize(chapter.authors[1].last);
    }
    else if(chapter.authors.length===3){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first)+","+
        capitalize(chapter.authors[1].first)+" "+capitalize(chapter.authors[1].last)+",and "+
        capitalize(chapter.authors[2].first)+" "+capitalize(chapter.authors[2].last);
    }
    else if(chapter.authors.length>3){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first)+", et al";
    }
    res+=".";
    res+=capitalize(chapter.title)+"."+capitalize(chapter.bookTitle);
    if(chapter.editors) 
        res+=",edited by "+capitalize(chapter.editors[0].first)+" "+capitalize(chapter.editors[0].first);
    if(chapter.publisher) res+=","+capitalize(chapter.publisher)
    if(chapter.publishedOn) res+=","+chapter.publishedOn.slice(0,4);
    if(chapter.pageRange) res+=","+chapter.pageRange+".";

    return res;
}

const chicago=(chapter)=>{
    var res="";
    if(chapter.authors.length===1){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first);
    }
    else if(chapter.authors.length===2){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first)+", and "
        +capitalize(chapter.authors[1].first)+" "+capitalize(chapter.authors[1].last);
    }
    else if(chapter.authors.length===3){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first)+","+
        capitalize(chapter.authors[1].first)+" "+capitalize(chapter.authors[1].last)+", and "
        +capitalize(chapter.authors[2].first)+" "+capitalize(chapter.authors[2].last);
    }
    else if(chapter.authors.length>3){
        res+=capitalize(chapter.authors[0].last)+","+capitalize(chapter.authors[0].first)+"et al";
    }
    res+=".";
    res+=capitalize(chapter.title)+".";
    if(chapter.bookTitle)   res+="In "+capitalize(chapter.bookTitle);
    if(chapter.editors) res+=" edited by "+capitalize(chapter.editors[0].first)+" "+capitalize(chapter.editors[0].first);
    if(chapter.pageRange)   res+=","+chapter.pageRange+".";
    if(chapter.publisher) res+=capitalize(chapter.publisher);
    if(chapter.publishedOn) res+=","+chapter.publishedOn.slice(0,4)+".";
    return res;
}

const vancouver=(chapter)=>{
    var res="";
    if(chapter.authors.length===1){
        res+=capitalize(chapter.authors[0].last)+" "+capitalize(chapter.authors[0].first);
    }
    else if(chapter.authors.length===2){
        res+=capitalize(chapter.authors[0].last)+" "+capitalize(chapter.authors[0].first)+", and "
        +capitalize(chapter.authors[1].first)+" "+capitalize(chapter.authors[1].last);
    }
    else if(chapter.authors.length===3){
        res+=capitalize(chapter.authors[0].last)+" "+capitalize(chapter.authors[0].first)+","+
        capitalize(chapter.authors[1].last)+" "+capitalize(chapter.authors[1].first)+", and "
        +capitalize(chapter.authors[2].last)+" "+capitalize(chapter.authors[2].first);
    }
    else if(chapter.authors.length>3){
        res+=capitalize(chapter.authors[0].last)+" "+capitalize(chapter.authors[0].first)+","+
        capitalize(chapter.authors[1].last)+" "+capitalize(chapter.authors[1].first)+", and "+
        capitalize(chapter.authors[2].last)+" "+capitalize(chapter.authors[2].first)+", et al"
    }
    res+=".";
    res+=capitalize(chapter.title)+". In:";
    for(let e=0;e<chapter.editors.size();e++){
        res+=capitalize(chapter.editors[e].last)+" "+capitalize(chapter.editors[e].first).slice(0,1)+","
    }
    res+=" editors. ";
    if(chapter.bookTitle)   res+=capitalize(chapter.bookTitle)+".";
    if(chapter.publisher) res+=capitalize(chapter.publisher)+"; ";
    if(chapter.publishedOn) res+=chapter.publishedOn.slice(0,4)+".";
    if(chapter.pageRange)   res+="p"+chapter.pageRange+".";
    return res;
}


module.exports ={apa,mla,chicago,vancouver};