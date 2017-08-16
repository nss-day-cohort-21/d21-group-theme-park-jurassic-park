'use strict';

let dataLoader = require('./data_loader');
let a = require("./templates.js");

var Handlers = {
  userInputOnEnterKey: function() {
    $(document).keypress(function(event) {
      if (event.keyCode === 13 && $('#user-input').is(':focus') && $('#user-input').val() !== '') {
        let userStr = $('#user-input').val();
        let capitalizedWord = _.startCase(_.toLower(userStr));

        dataLoader.attractionByNameCall(capitalizedWord)
          .then(function(data){
            console.log('Data: ', data);
            a.loadAttractionsToDOM(data);
          });
      }
    });
  }
};

Handlers.userInputOnEnterKey();
