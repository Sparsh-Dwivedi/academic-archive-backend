const {capitalize}=require('./service')

const apa=(book)=>{ 
    var res="";
    if(book.authors.length===1){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first).slice(0,1);
    }
    else if(book.authors.length===2){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first).slice(0,1)+".,&"+capitalize(book.authors[1].last)+","+capitalize(book.authors[1].first).slice(0,1);
    }
    else if(book.authors.length===3){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first).slice(0,1)+".,"
        capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first).slice(0,1)+".,&"
        +capitalize(book.authors[1].last)+","+capitalize(book.authors[1].first).slice(0,1);
    }
    else if(book.authors.length>3){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first).slice(0,1)+"et al";
    }
    res+=".";
    if(book.publishedOn) res+="("+book.publishedOn.slice(0,4)+")"+".";
    res+=capitalize(book.title);
    if(book.edition) res+="("+book.edition+").";
    if(book.publisher) res+=capitalize(book.publisher)+"."
    if(book.doi) res+=book.doi;
    return res;
}
const mla=(book)=>{ 
    var res="";
    if(book.authors.length===1){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first);
    }
    else if(book.authors.length===2){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first)+" and "+
        capitalize(book.authors[1].first)+" "+capitalize(book.authors[1].last);
    }
    else if(book.authors.length===3){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first)+","+
        capitalize(book.authors[1].last)+","+capitalize(book.authors[1].first)+" and "+
        capitalize(book.authors[2].first)+" "+capitalize(book.authors[2].last);
    }
    else if(book.authors.length>3){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first)+", et al";
    }
    res+=".";
    res+=capitalize(book.title)+".";
    if(book.edition) res+=book.edition+",";
    if(book.publisher) res+=capitalize(book.publisher)
    if(book.publishedOn) res+=","+book.publishedOn.slice(0,4)+".";
    return res;
}

const chicago=(book)=>{
    var res="";
    if(book.authors.length===1){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first);
    }
    else if(book.authors.length===2){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first)+", and "
        +capitalize(book.authors[1].first)+" "+capitalize(book.authors[1].last);
    }
    else if(book.authors.length===3){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first)+","+
        capitalize(book.authors[1].first)+" "+capitalize(book.authors[1].last)+", and "
        +capitalize(book.authors[2].first)+" "+capitalize(book.authors[2].last);
    }
    else if(book.authors.length>3){
        res+=capitalize(book.authors[0].last)+","+capitalize(book.authors[0].first)+"et al";
    }
    res+=".";
    res+=capitalize(book.title)+".";
    if(book.publisher) res+=capitalize(book.publisher);
    if(book.publishedOn) res+=","+book.publishedOn.slice(0,4)+".";
    return res;
}

const vancouver=(book)=>{
    var res="";
    if(book.authors.length===1){
        res+=capitalize(book.authors[0].last)+" "+capitalize(book.authors[0].first);
    }
    else if(book.authors.length===2){
        res+=capitalize(book.authors[0].last)+" "+capitalize(book.authors[0].first)+", and "
        +capitalize(book.authors[1].last)+" "+capitalize(book.authors[1].first);
    }
    else if(book.authors.length===3){
        res+=capitalize(book.authors[0].last)+" "+capitalize(book.authors[0].first)+","+
        capitalize(book.authors[1].last)+" "+capitalize(book.authors[1].first)+", and "
        +capitalize(book.authors[2].last)+" "+capitalize(book.authors[2].first);
    }
    else if(book.authors.length>3){
        res+=capitalize(book.authors[0].last)+" "+capitalize(book.authors[0].first)+","+
        capitalize(book.authors[1].last)+" "+capitalize(book.authors[1].first)+","+
        capitalize(book.authors[2].last)+" "+capitalize(book.authors[2].first)+", et al"
    }
    res+=".";
    res+=capitalize(book.title)+".";
    if(book.publisher) res+=capitalize(book.publisher);
    if(book.publishedOn) res+=","+book.publishedOn.slice(0,4)+".";
    return res;
}


module.exports ={apa,mla,chicago,vancouver};