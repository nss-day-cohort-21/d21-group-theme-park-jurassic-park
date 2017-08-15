'use strict';

var template = require('./templates');

template.loadNavbar();

var Park = {
  loadAreas: function(){
    $.ajax({
      url: "https://android-chat-app-c66de.firebaseio.com/areas.json"
    }).done(function(data){
      console.log(data);
    });
  }
};

Park.loadAreas();
