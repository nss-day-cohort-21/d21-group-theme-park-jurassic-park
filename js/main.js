'use strict';

var template = require('./templates');
var areaGrid = require('../templates/areaGrid.hbs');

template.loadNavbar();

var Park = {
  loadAreas: function(){
    $.ajax({
      url: "https://android-chat-app-c66de.firebaseio.com/areas.json"
    }).done(function(data){
      console.log(data);
      $('#main-content').append(areaGrid(data));
    });
  }
};

Park.loadAreas();

