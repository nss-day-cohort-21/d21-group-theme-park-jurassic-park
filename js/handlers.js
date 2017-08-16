'use strict';

let dataLoader = require('./data_loader')

var Handlers = {
  userInputOnEnterKey: function() {
    $(document).keypress(function(event) {
      if (event.keyCode === 13 && $('#user-input').is(':focus') && $('#user-input').val() !== '') {
        dataLoader.attractionByNameCall($('#user-input').val())
          .then(function(data){
            console.log('Data: ', data);
          });
      }
    });
  }
};
Handlers.userInputOnEnterKey();
module.exports = Handlers;
