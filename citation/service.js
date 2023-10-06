const { bookApa, bookMla, bookChicago, bookVancouver } = require("./book");
const { chapterApa, chapterMla, chapterChicago, chapterVancouver } = require("./chapter");
const { conferenceApa, conferenceMla, conferenceChicago, conferenceVancouver } = require("./conference");
const { journalApa, journalMla, journalChicago, journalVancouver } = require("./journal");

const capitalize=(str)=>{
    return str[0].toUpperCase()+str.slice(1);
}

const citePaper=(arr,type,cite)=>{
    var temp=[];
    for(let i=0;i<arr.length;i++){
        if(type==='book'){
            if(cite==='apa')    temp.push(bookApa(arr[i]));
            if(cite==='mla')    temp.push(bookMla(arr[i]));
            if(cite==='chicago')    temp.push(bookChicago(arr[i]));
            if(cite==='vancouver')    temp.push(bookVancouver(arr[i]));
        }
        if(type==='chapter'){
            if(cite==='apa')    temp.push(chapterApa(arr[i]));
            if(cite==='mla')    temp.push(chapterMla(arr[i]));
            if(cite==='chicago')    temp.push(chapterChicago(arr[i]));
            if(cite==='vancouver')    temp.push(chapterVancouver(arr[i]));
        }
        if(type==='journal'){
            if(cite==='apa')    temp.push(journalApa(arr[i]));
            if(cite==='mla')    temp.push(journalMla(arr[i]));
            if(cite==='chicago')    temp.push(journalChicago(arr[i]));
            if(cite==='vancouver')    temp.push(journalVancouver(arr[i]));
        }
        if(type==='conference'){
            if(cite==='apa')    temp.push(conferenceApa(arr[i]));
            if(cite==='mla')    temp.push(conferenceMla(arr[i]));
            if(cite==='chicago')    temp.push(conferenceChicago(arr[i]));
            if(cite==='vancouver')    temp.push(conferenceVancouver(arr[i]));
        }
    }
    return temp;
}

module.exports ={capitalize,citePaper};