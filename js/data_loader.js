'use strict';
var Park = {
  attractionsNameArray: [],

  attractionsCall: function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'https://android-chat-app-c66de.firebaseio.com/attractions.json'
      }).done(function(data) {
        let mapArr = Park.createAttractionsList(data);
        resolve(mapArr);
      });
    });
  },

  createAttractionsList: function(data) {
    let attractionsNames = _.map(data, function(item) {
      return item.name;
    });
    return attractionsNames;
  }
};

module.exports = Park;