'use strict';

let Park = require('./data_loader');
let Time = require('./time');
let HbsTemplate = require('../templates/legend_list.hbs');
let Handlersa = require('./handlers.js');
let MapGrid = require('./map.js');

var Templates = {
  loadNavbar: function() {
    $('body').before(`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src="images/Jurassic_Park_logo.jpg" style="width:90px;height:60px;display:inline-block"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <input id="user-input" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

          Select Search Type:
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a id="attraction-name" class="dropdown-item" href="#">Attraction Name</a>
          <a id="attraction-time" class="dropdown-item" href="#">Attraction Time</a>
        </div>
      </li>
        </div>
      </div>
    </nav>
    `);
  },

  // TODO: highlight border of grid instead of write names to DOM.
  // loadAttractionsToDomOnSearch: function(data) {
  //   let accordion = '';
  //   $('.attractions-list').html('');
  //   _.forEach(data, function(item) {
  //     accordion = `<div class="item" typeId=${item.type_id}>
  //                       <a data-toggle="collapse" data-parent="#accordion-wrapper" href="#${item.id}" aria-expanded="true" aria-controls="${item.id}">${item.name}</a>
  //                       <div id="${item.id}" class="collapse" role="tabpanel">
  //                         <p class="mb-3" style="color:white">${item.description}</p>
  //                       </div>
  //                   </div>`;
  //     $('.attractions-list').append(HbsTemplate(data));
  //   });
  // },

  loadAttractionsByArea: function(attractionCall, id) {
    let accordion = '';

    attractionCall(id).then(function(data) {
      $('#accordion-wrapper').html('');
      $('#accordion-wrapper').append(HbsTemplate(data));

    });

  },

  loadAreas: function() {
    Park.areasCall().then(function(data) {
      _.forEach(data, function(item, index) {
        let gridElement = '';
        if (item.id === 5 || item.id === 7) {
          gridElement = `<div class="col-4">
                            <div class="img-wrapper">
                              <a href="#" class="img-content"></a>
                              <img class="img-thumbnail img">
                            </div>
                          </div>
                          <div class="col-4">
                            <div id="${item.id}" class="img-wrapper">
                              <a id="${item.id}" href="#" class="img-content">${item.name}</a>
                              <img class="img-thumbnail img" id="${item.id}">
                            </div>
                          </div>`;
          $('.grid-row').append(gridElement);
        } else {
          gridElement = `<div class="col-4">
                            <div id="${item.id}" class="img-wrapper">
                              <a id="${item.id}" href="#" class="img-content">${item.name}</a>
                              <img class="img-thumbnail img" id="${item.id}">
                            </div>
                          </div>`;

          $('.grid-row').append(gridElement);
        }
        console.log("areas loaded");
        MapGrid.appendMap(item.id);//create map grid here
      });
    });
  },
};

module.exports = Templates;
