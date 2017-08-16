'use strict';

var Park = require('./data_loader');

var Templates = {
  loadNavbar: function() {
    $('body').before(`
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color:black">
      <a class="navbar-brand" href="#"><img src="images/Jurassic_Park_logo.jpg" style="width:90px;height:60px;display:inline-block"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <input id="user-input" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-warning my-2 my-sm-0" type="submit">Search</button>


      </div>
    </nav>
    `);
  },

    // TODO: highlight border of grid instead of write names to DOM.
  loadAttractionsToDomOnSearch: function(data){
    $('.attractions-list').html('')
    _.forEach(data, function(item) {

        
      $('.attractions-list').append(`<a href="#">${item.name}</a><br>`)
    });
  },

  loadAttractionsByArea: function(attractionCall,id) {
    let accordion = "";

      
      attractionCall(id)
        .then(function (data) {
          $('.list-group-attractions').html("");
          _.forEach(data, function(item) {
            accordion = `<li class="list-group-item"><a href="${item.id}">${item.name}</a></li>`
            $('.list-group-attractions').append(accordion);
          });
            

        });
  },

  loadAreas: function(){
    Park.areasCall().then(function(data){
        _.forEach(data, function(item, index) {
            let gridElement = '';
            if (item.id === 5 || item.id===7) {
              gridElement = `<div id="" class="col-4">
                                 <div class="img-wrapper">
                                   <a href="#" class="img-content"></a>
                                   <img class="img-thumbnail">
                                 </div>
                               </div>
                               <div id="${item.id}" class="col-4">
                                 <div class="img-wrapper">
                                   <a id="${item.id}" href="#" class="img-content">${item.name}</a>
                                   <img class="img-thumbnail img" id="${item.id}">
                                 </div>
                               </div>`;

              $('.grid-row').append(gridElement);
            } else {
              gridElement = `<div class="col-4">
                               <div class="img-wrapper">
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


