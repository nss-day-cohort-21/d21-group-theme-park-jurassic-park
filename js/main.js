'use strict';
var template = require('./templates');
var time = require('./time');

template.loadNavbar();
template.loadAreas();
time.loadOpenAttractions();

function liveTime(){
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth();
    var year = time.getFullYear();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var sec = time.getSeconds();
    hour = getTime(hour);
    minute = getTime(minute);
    sec = getTime(sec);
    $('#demo').html(day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + sec);
    var newTime = setTimeout(liveTime, 1000);
}
function getTime(i){
    if(i < 10){i ="0" +i};
    return i;
}
liveTime();
