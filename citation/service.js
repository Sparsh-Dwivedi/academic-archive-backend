const { bookApa, bookMla, bookChicago, bookVancouver } = require("./book");
const { chapterApa, chapterMla, chapterChicago, chapterVancouver } = require("./chapter");
const { conferenceApa, conferenceMla, conferenceChicago, conferenceVancouver } = require("./conference");
const { journalApa, journalMla, journalChicago, journalVancouver } = require("./journal");

const capitalize=(str)=>{
    console.log(str)
    return str[0].toUpperCase()+str.slice(1);
}

const citePaper=(arr,type,cite)=>{
    var temp=[];
    // console.log(arr)
    // console.log(type)
    // console.log(cite)
    for(let i=0;i<arr.length;i++){
        var newValue;
        if(type==='book'){
            if(cite==='apa')    newValue=(bookApa(arr[i]));
            if(cite==='mla')    newValue=(bookMla(arr[i]));
            if(cite==='chicago')    newValue=(bookChicago(arr[i]));
            if(cite==='vancouver')    newValue=(bookVancouver(arr[i]));
        }
        if(type==='chapter'){
            if(cite==='apa')    newValue=(chapterApa(arr[i]));
            if(cite==='mla')    newValue=(chapterMla(arr[i]));
            if(cite==='chicago')    newValue=(chapterChicago(arr[i]));
            if(cite==='vancouver')    newValue=(chapterVancouver(arr[i]));
        }
        if(type==='journal'){
            if(cite==='apa')    newValue=(journalApa(arr[i]));
            if(cite==='mla')    newValue=(journalMla(arr[i]));
            if(cite==='chicago')    newValue=(journalChicago(arr[i]));
            if(cite==='vancouver')    newValue=(journalVancouver(arr[i]));
        }
        if(type==='conference'){
            if(cite==='apa')    newValue=(conferenceApa(arr[i]));
            if(cite==='mla')    newValue=(conferenceMla(arr[i]));
            if(cite==='chicago')    newValue=(conferenceChicago(arr[i]));
            if(cite==='vancouver')    newValue=(conferenceVancouver(arr[i]));
        }
        if(newValue.success){
            temp.push(newValue.value);
        }
        else return newValue;
    }
    return {success:1,value:temp};
}

module.exports ={capitalize,citePaper};