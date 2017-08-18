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
      <a class="navbar-brand" href="#"><img src="images/Jurassic_Park_logo.jpg" style="width:100px;height:70px;display:inline-block;margin-left:450px"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <input id="user-input" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <fieldset class="form-group attractions-radio">
            <div class="row">
              <legend class="col-form-legend col-sm-12">Search By:</legend>
              <div class="col-sm-12">
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="attractions" id="attractions-name" value="attractions-name">
                    Name
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="attractions" id="attractions-time" value="attractions-time">
                    Time
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="attractions" id="attractions-type" value="attractions-type">
                    Type
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
  </nav>
  `);
  },

  loadAttractionsByArea: function(attractionCall, id) {
    let accordion = '';

    attractionCall(id).then(function(data) {
      $('#accordion-wrapper').html('');
      $('#accordion-wrapper').append(HbsTemplate(data));

      let currentEvents = $('.item');
      Time.addTypes(currentEvents);

      $("a.attractionNameLink").on("click", (e) => {
      let gridRow = $('.img-wrapper').find("img");
      $(gridRow).removeAttr('style');
        let accordionid = $(e.target).parent().attr("areaid");
         Park.areasCall().then(function(dataArea) {
          let color = dataArea[accordionid - 1].colorTheme;
          let imgwrap = $(".img-wrapper");
          imgwrap.each((index,item)=>{
            if(Number(item.id)===dataArea[accordionid - 1].id){
              $(item).find('.img').attr('style', `border: 3px solid #${color}`);
              let areaNamesss = $(item).children("a").html();
              let correctPTag = $(e.target).siblings("div").children(".areaNameDropDown").html(areaNamesss+`<br>`);
              let ariaControls = $(e.target).attr("aria-controls");
              let thisTimes = data[ariaControls-1].times;
              if (thisTimes !== undefined) {
                thisTimes = thisTimes.toString().replace(/\M/g, "M ");
                $(e.target).siblings("div").children(".areaNameDropDown").append(thisTimes);
              }
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
        MapGrid.appendMap(item.id);  //create map grid here
      });
    });
  }
};

module.exports = Templates;
