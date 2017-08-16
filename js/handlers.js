'use strict';

let dataLoader = require('./data_loader');
let templates = require('./templates.js');

var Handlers = {
  loadAttractionsOnEnterKey: function() {
    $(document).keypress(function(event) {
      if (event.keyCode === 13 && $('#user-input').is(':focus') && $('#user-input').val() !== '') {
        let userStr = $('#user-input').val();
        let capitalizedWord = _.startCase(_.toLower(userStr));

        dataLoader.attractionByNameCall(capitalizedWord).then(function(data) {
          templates.loadAttractionsToDomOnSearch(data);
        });
      }
    });
  },
  loadAttractionsOnClickArea: function() {
    $('.grid-row').click(function(event) {
      templates.loadAttractionsByArea(dataLoader.attractionsCallByAreaId, event.target.id);
    });
  },

  addBorderColor: function(attributeCall) {
    $('.grid-row').click(function(event) {
      attributeCall().then(function(data) {
        let color = data[$(event.target)[0].id].colorTheme;
        let imageElement = $(event.currentTarget).find(`img#${event.target.id}`)[0];
        $(imageElement).attr('style', `border: 3px solid #${color}`);
        console.log('Img: ', imageElement, color);
      });
    });
  }
};

Handlers.loadAttractionsOnEnterKey();
Handlers.loadAttractionsOnClickArea();
Handlers.addBorderColor(dataLoader.areasCall);
module.exports = Handlers;
