'use strict';

var Park = {
  attractionsNameArray: [],

  areasCall: function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'https://android-chat-app-c66de.firebaseio.com/areas.json'
      }).done(function(data) {
      	console.log("data in areas", data);
        resolve(data);
      });
    });
  },

  attractionsCall: function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'https://android-chat-app-c66de.firebaseio.com/attractions.json'
      }).done(function(data) {
        // let mapArr = Park.createAttractionsList(data);
        resolve(data);
      });
    });
  },

  attractionByNameCall: function(userInput) {
  	return new Promise(function(resolve, reject){
	  	$.ajax({
	  		url: `https://android-chat-app-c66de.firebaseio.com/attractions.json?orderBy="name"&equalTo="${userInput}"`
	  	}).done(function(data){
	  		resolve(data);
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

Park.areasCall();

module.exports = Park;