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
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-warning my-2 my-sm-0" type="submit">Search</button>


      </div>
    </nav>
    `);
  },

    // TODO: highlight border of grid instead of write names to DOM.
  loadAttractionsToDOM: function(data){
    $('.attractions-list').html('')
    _.forEach(data, function(item) {
      $('.attractions-list').append(`<a href="#">${item.name}</a><br>`)
    });
  },

  loadAreas: function(){
    Park.areasCall().then(function(data){
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
          $('.col-8 > .row').append(
            `<div class="col-4 border rounded" id=gridArea${index} style="background-color:#${item.colorTheme};height:250px">
            <h2>${item.name}</h2>
            </div>`
          );
          // $(`#gridArea${index}`).attr("style", `background-color:#${item.colorTheme}`);
        });


    });
  }

};

module.exports = Templates;
