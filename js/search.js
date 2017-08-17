let Park = require('./data_loader.js');
let HbsTemplate = require('../templates/legend_list.hbs');
let Search = {};
let attractionsArr = [];
let Handlers = require('./handlers.js');
let Time = require('./time');
// Fuzzy search parameters
var options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name']
};

//create array of attractions objects
Park.attractionsCall().then(function(resolve) {
  attractionsArr = resolve;
});

//on key up, search array of objects for name matches, then print
$('#user-input').keyup(function() {
  let gridRow = $('.img-wrapper').find("img");
  $(gridRow).removeAttr('style');
  let searchText = $('#user-input').val();
  if (searchText === "") {
    Time.loadOpenAttractions();
  } else {
    let fuse = new Fuse(attractionsArr, options);
    let result = fuse.search(searchText);
    let namesList = [];
    result.forEach(item => {
      namesList.push(item);
    });
    printResults(namesList);
  }
});

//for each item in search results, print to DOM with link
printResults = function(data) {
  $('#accordion-wrapper').html('');
  $('#accordion-wrapper').append(HbsTemplate(data));
  $("a.attractionNameLink").on("click", (e) => {
  let gridRow = $('.img-wrapper').find("img");
  $(gridRow).removeAttr('style');
    let accordionid = $(e.target).parent().attr("areaid");
     Park.areasCall().then(function(data) {
      let color = data[accordionid - 1].colorTheme;
      let imgwrap = $(".img-wrapper");
      imgwrap.each((index,item)=>{
        if(Number(item.id)===data[accordionid - 1].id){
          $(item).find('img').attr('style', `border: 3px solid #${color}`);
          let areaNamesss = $(item).children("a").html();
          let correctPTag = $(e.target).siblings("div").children(".areaNameDropDown").html(areaNamesss);
        }
      });
    });
  })
};
