'use strict';

let Park = require('./data_loader');

var Time = {
  loadTimeData: function(){
    Park.attractionsCall().then(function(data) {
      let timeArr = data[1];
      console.log("time", timeArr);
    });
  }
};


module.exports = Time;
