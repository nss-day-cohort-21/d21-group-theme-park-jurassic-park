'use strict';

var Park = {
  attractionsNameArray: [],

  areasCall: function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'https://android-chat-app-c66de.firebaseio.com/areas.json'
      }).done(function(data) {
        resolve(data);
      });
    });
  },

  attractionsCall: function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'https://android-chat-app-c66de.firebaseio.com/attractions.json'
      }).done(function(data) {
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
  },

  attractionsCallByAreaId: function(value) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `https://android-chat-app-c66de.firebaseio.com/attractions.json?orderBy="area_id"&equalTo=${value}`
      }).done(function(data) {
        // let mapArr = Park.createAttractionsList(data);

        resolve(data);
      });
    });
  },

};



module.exports = Park;
