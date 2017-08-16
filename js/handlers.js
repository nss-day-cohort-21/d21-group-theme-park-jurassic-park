'use strict';

let dataLoader = require('./data_loader');
let templates = require("./templates.js");

var Handlers = {
  loadAttractionsOnEnterKey: function() {
    $(document).keypress(function(event) {
      if (event.keyCode === 13 && $('#user-input').is(':focus') && $('#user-input').val() !== '') {
        let userStr = $('#user-input').val();
        let capitalizedWord = _.startCase(_.toLower(userStr));

        dataLoader.attractionByNameCall(capitalizedWord)
          .then(function(data){
            console.log('Data: ', data);
            templates.loadAttractionsToDomOnSearch(data);
          });
      }
    });
  },
  loadAttractionsOnClickArea: function() {


    $(".grid-row").click(function(event){
      console.log("event id: ", event.target.id, "eventwrapper:", event.target);

      dataLoader.attractionsCall("area_id", event.target.id);
      https://android-chat-app-c66de.firebaseio.com/attractions/.json?orderBy="area_id"&equalTo=1
    })
  }




};

Handlers.loadAttractionsOnEnterKey();
Handlers.loadAttractionsOnClickArea();
