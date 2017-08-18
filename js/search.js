let Park = require('./data_loader.js');
let HbsTemplate = require('../templates/legend_list.hbs');
let Search = {};
let attractionsArr = [];
let attractionsTypeArr = [];
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
  keys: ['name'],
};

//create array of attractions objects
Park.attractionsCall().then(function(resolve) {
  attractionsArr = resolve;
});
Park.attractionsTypeCall().then(function(data) {
  attractionsTypeArr = data;
});

// Search by time or by name
$('.attractions-radio').click(function(event) {
  // Set search key option name or time
  if (event.target.id === 'attractions-time') {
    options['keys'] = ['times'];
    // Search on key up
    $('#user-input').keyup(function() {
      let gridRow = $('.img-wrapper').find('img');
      $(gridRow).removeAttr('style');
      let searchText = $('#user-input').val();
      if (searchText === '') {
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
  } else if (event.target.id === 'attractions-name') {
    options['keys'] = ['name'];
    // Search on key up
    $('#user-input').keyup(function() {
      let gridRow = $('.img-wrapper').find('img');
      $(gridRow).removeAttr('style');
      let searchText = $('#user-input').val();
      if (searchText === '') {
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
  } else if (event.target.id === 'attractions-type') {
    options['keys'] = ['name'];
    // Search on key up
    $('#user-input').keyup(function() {
      let gridRow = $('.img-wrapper').find('img');
      $(gridRow).removeAttr('style');
      let searchText = $('#user-input').val();
      if (searchText === '') {
        Time.loadOpenAttractions();
      } else {
        let fuse = new Fuse(attractionsTypeArr, options);
        let result = fuse.search(searchText);

        Park.attractionsCallByTypeId(result[0].id).then(function(data) {
          let namesList = [];
          _.forOwn(data, function(item) {
            namesList.push(item);
          });
          printResults(namesList);
        });
      }
    });
  }
});

//for each item in search results, print to DOM with link
printResults = function(data) {
  $('#accordion-wrapper').html('');
  $('#accordion-wrapper').append(HbsTemplate(data));
  $('a.attractionNameLink').on('click', (e) => {
    let gridRow = $('.img-wrapper').find('img');
    $(gridRow).removeAttr('style');
    let accordionid = $(e.target).parent().attr('areaid');

    Park.areasCall().then(function(data) {
      let color = data[accordionid - 1].colorTheme;
      let imgwrap = $('.img-wrapper');
      imgwrap.each((index, item) => {
        if (Number(item.id) === data[accordionid - 1].id) {
          $(item).find('img').attr('style', `border: 3px solid #${color}`);
        }
      });
    });
  });
};
