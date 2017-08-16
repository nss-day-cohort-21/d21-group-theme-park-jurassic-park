'use strict';

let Park = require('./data_loader');

let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let currentTotalMinutes = (hours*60) + minutes;


var Time = {
  loadOpenAttractions: function(){
    Park.attractionsCall().then(function(data) {

      $(data).each((index, item)=>{
        if (item.times !== undefined) {
          let eachAttTimes = item.times;
          for (var i = 0; i < eachAttTimes.length; i++) {
            let newTime = eachAttTimes[i].replace(/\:/g, " ");
            let afternoonTimes = _.includes(newTime, "PM");
            let noonTimes = _.includes(newTime, "12");
            let afternoonMinutes = 0;
            let morningMinutes = 0;
            let theseMinutes;

            if (afternoonTimes) {

              newTime = newTime.replace(/\AM/g, "");
              newTime = newTime.replace(/\PM/g, "");

              let splitTime = newTime.split(" ");
              if (noonTimes) {
                splitTime[0] = Number(splitTime[0]*60);
                splitTime[1] = Number(splitTime[1]);

                let timeTotalMinutes = splitTime.reduce(function(sum, value){
                  return sum + value
                }, 0);
                afternoonMinutes = timeTotalMinutes;
              } else {
                splitTime[0] = Number(splitTime[0]*60 + 720);
                splitTime[1] = Number(splitTime[1]);

                let timeTotalMinutes = splitTime.reduce(function(sum, value){
                  return sum + value
                }, 0);
                afternoonMinutes = timeTotalMinutes;
              }

            } else {

              newTime = newTime.replace(/\AM/g, "");
              newTime = newTime.replace(/\PM/g, "");

              let splitTime = newTime.split(" ");
              splitTime[0] = Number(splitTime[0]*60);
              splitTime[1] = Number(splitTime[1]);

              let timeTotalMinutes = splitTime.reduce(function(sum, value){
                return sum + value
              }, 0);
              morningMinutes = timeTotalMinutes;
            }

            theseMinutes = afternoonMinutes + morningMinutes;

            if (theseMinutes - currentTotalMinutes <= 60 && theseMinutes - currentTotalMinutes >= 0) {
              console.log(theseMinutes - currentTotalMinutes);
              console.log(item);
              // *************************************
              // CALL THE WRITE T0 SIDEBAR FUNCTION
              // *************************************
              let accordion = `<li class="list-group-item"><a href="${item.id}">${item.name}</a><br><p>Open in: ${theseMinutes - currentTotalMinutes} minutes</p></li>`
              $('.list-group-attractions').prepend(accordion);
            }
          }
        } else {
          // *************************************
          // CALL THE WRITE T0 SIDEBAR FUNCTION
          // *************************************
          let accordion = `<li class="list-group-item"><a href="${item.id}">${item.name}</a><br><p>Open All Day</p></li>`
          $('.list-group-attractions').prepend(accordion);
        }
      })
    });
  }
};


module.exports = Time;
