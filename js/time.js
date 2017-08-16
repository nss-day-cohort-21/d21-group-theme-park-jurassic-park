'use strict';

let Park = require('./data_loader');

let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let seconds = currentTime.getSeconds();

var Time = {
  loadTimeData: function(){
    Park.attractionsCall().then(function(data) {
      let timeArr = data[1];
      console.log("time", timeArr);
      console.log("hours", hours, "minutes", minutes, "seconds", seconds);
      $(timeArr).each((index, item)=>{
        // console.log(item.times);
        if (item.times !== undefined) {
          console.log(item.times);
        }
      })
    });
  }
};


module.exports = Time;
