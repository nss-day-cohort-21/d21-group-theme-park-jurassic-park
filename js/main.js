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


$('.open-cages').click(function(){
    $('.bkimg').css('backgroundImage', 'url(../../images/breakout.jpg');
    $('.img').css('opacity', '.3');
})


///////////////////////////////////////////////////////







let songcounter = 1;
let firebase={};
firebase.refresh = (function() {
    $("#rows").html("");
    let ajaxrequest = require('./firebaserequest');
    ajaxrequest().then((response)=>{
        console.log("the most updated songdata from firebase is", response);
        if (response!== null ) {
            let arr = Object.keys(response).forEach( function(key){
            let newArrItem = response[key];
            newArrItem.key = key;
            printdatatoHTML(newArrItem);
            });
        }
    });
})();

/////////////////////GET VIEWPORT & ADD EVENT LISTENERS////////////////////////
document.getElementById("song-name").onkeydown = checkenterkey;
document.getElementById("artist").onkeydown = checkenterkey;
document.getElementById("album-name").onkeydown = checkenterkey;

function checkenterkey(e) {
    if (e.keyCode == 13) {
        takeuserinput();    
    }
}
document.getElementById("addbutton").addEventListener("click", takeuserinput);
function checkenterkey(e) {
    if (e.keyCode == 13) {
        takeuserinput();    
    }
}


/////////////////////RECORDING USER DATA////////////////////////
function takeuserinput() {

        
    let name = document.getElementById("song-name").value;
    let artist = document.getElementById("artist").value;
    let album = document.getElementById("album-name").value;
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();
    let currentdate = month + "/" + day + "/" + year +" "+hour+":"+minute;
    let newSong = {
      artist: artist,
      album: album,
      name: name,
      time:currentdate
    };
   
    if (name ==="") {
        alert("Enter an Event Name");
        document.getElementById("song-name").focus();
    }
    else if(artist === "") {
        alert("Enter a Time");
        document.getElementById("artist").focus();
    }
    else if(album === "") {
        alert("Enter a Location");
        document.getElementById("album-name").focus();
    }
    else {
        // songcounter.push(name+" > by "+artist+" on the album " +album);
        $(".modal-body").html("Event Successfully Added!");
        $('#myModal').modal('show');
        senddatatofirebase(newSong);
    }
}

/////////////////////SENDING USER DATA TO FIREBASE////////////////////////
function senddatatofirebase(newSong) {
    $.ajax({
      url: "https://musichistory-43b58.firebaseio.com/.json",
      method: "POST",
      data: JSON.stringify(newSong),
      header: "messages"
    })
    .done(function(response) {          
        newSong.key = response.name;        
        document.getElementById("song-name").value="";
        document.getElementById("artist").value="";
        document.getElementById("album-name").value="";
        document.getElementById("song-name").focus();
        printdatatoHTML(newSong);
        
    });
}

/////////////////////PRINTING USER DATA TO HTML////////////////////////
let Handlebars = require('hbsfy/runtime');
Handlebars.registerPartial('timestamp', require('../templates/partials/timestamp.hbs'));
let songtemplate = require('../templates/songgrid.hbs');
let modal =  require("../templates/modal.hbs");
$(document.body).append(modal);

function printdatatoHTML(newSong) {
        newSong.counter=songcounter;
        $("#rows").prepend(songtemplate(newSong));   
        $(`#b${songcounter}`).on("click", (event)=>{
                    $.ajax({
                      url: `https://musichistory-43b58.firebaseio.com/${newSong.key}/.json`,
                      method: "DELETE"
                    })
                    .done(function(response) {
                        deleteself(event);  
                      // console.log("response after deletion", response);
                      // You'll likely want to execute the code that you're using
                      // on page load here to run the GET XHR and bind to Handlebars
                    });
                }); 

        songcounter+=1;
        $('.timeago').timeago();
}

function deleteself(event) {
    let parent = event.target.parentNode.parentNode;         
            
    parent.parentNode.removeChild(parent);
    $(".modal-body").html("Event Successfully Deleted!");
    $('#myModal').modal('show');
}   











