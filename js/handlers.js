'use strict';

let dataLoader = require('./data_loader');
let a = require("./templates.js");
var Handlers = {
  userInputOnEnterKey: function() {
    $(document).keypress(function(event) {
      if (event.keyCode === 13 && $('#user-input').is(':focus') && $('#user-input').val() !== '') {
        let word = $('#user-input').val().toLowerCase();
        let splitword = word.split(" ");
        let capitalizedword = splitword.map((word)=>{
            word = word.substr(0,1).toUpperCase()+word.substr(1);
            return word;
        })
        capitalizedword = capitalizedword.join(" ");
        console.log("cap", capitalizedword);
          
          
          
        
        dataLoader.attractionByNameCall(capitalizedword)
          .then(function(data){
            console.log('Data: ', data);
            a.loadAttractionsToDOM(data);
          });
      }
    });
  }
};
Handlers.userInputOnEnterKey();