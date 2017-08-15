'use strict';

var handlebars = require('hbsfy/runtime');
var template = require('./templates');
var areaGrid = require('../templates/areaGrid.hbs');

template.loadNavbar();


var Park = {
  loadAreas: function(){
    $.ajax({
      url: "https://android-chat-app-c66de.firebaseio.com/areas.json"
    }).done(function(data){
      console.log(data);
      $('#main-content').append(
        `<div class=row>
          <div class=col-4>
          </div>
          <div class=col-8>
            <div class=row>
            </div>
          </div>
        </div>`);

        $(data).each((index, item) =>{
          $('.col-8 > .row').append(`<div class="col-4">${item.name}</div>`);
        });

    });
  }
};

Park.loadAreas();
