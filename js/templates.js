'use strict';

let Park = require('./data_loader');
let Time = require('./time');
let HbsTemplate = require('../templates/legend_list.hbs');
let Handlersa = require('./handlers.js');

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
      $("a.attractionNameLink").on("click", (e) => {
      let gridRow = $('.img-wrapper').find("img");
      $(gridRow).removeAttr('style');
        let accordionid = $(e.target).parent().attr("areaid");
         Park.areasCall().then(function(dataArea) {
          let color = dataArea[accordionid - 1].colorTheme;
          let imgwrap = $(".img-wrapper");
          imgwrap.each((index,item)=>{
            if(Number(item.id)===dataArea[accordionid - 1].id){
              $(item).find('img').attr('style', `border: 3px solid #${color}`);
              let areaNamesss = $(item).children("a").html();
              let correctPTag = $(e.target).siblings("div").children(".areaNameDropDown").html(areaNamesss);
              let ariaControls = $(e.target).attr("aria-controls");
              let thisTimes = data[aria-controls-1].times;
              
            }
          });
        });
      })
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
      });
    });
  }
};

module.exports = Templates;
