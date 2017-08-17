let Park = require('./data_loader.js');
let Search = {};
let attractionsArr = [];

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
  let searchText = $('#user-input').val();
  let fuse = new Fuse(attractionsArr, options);
  let result = fuse.search(searchText);
  let namesList = [];
  result.forEach(item => {
    namesList.push(item);
  });
  printResults(namesList);
});

//for each item in search results, print to DOM with link
printResults = function(result) {
  $('#accordion-wrapper').html('');
  let accordion = '';
  _.forEach(result, function(item) {
    accordion = `<div class="item">
                     <a data-toggle="collapse" data-parent="#accordion-wrapper" href="#${item.id}" aria-expanded="true" aria-controls="${item.id}">${item.name}</a>
                     <div id="${item.id}" class="collapse" role="tabpanel">
                       <p class="mb-3">${item.description}</p>
                     </div>
                 </div>`;
    $('#accordion-wrapper').append(accordion);
  });
};

