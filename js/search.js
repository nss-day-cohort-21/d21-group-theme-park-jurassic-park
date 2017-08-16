
let Park = require('./data_loader.js');
let Search = {};
let attractionsArr = [];

//fuse search parameters
var options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
  	'name'
  ]
};

Park.attractionsCall().then(function(resolve){
	attractionsArr = resolve;
});

$('#user-input').keyup(function(){
    let searchText = $('#user-input').val();
    let fuse = new Fuse(attractionsArr, options);
    let result = fuse.search(searchText);
    let namesList = '';
    result.forEach((item)=>{
    	namesList += item.name;
    });
	printResults(namesList);
});

printResults = function (result){
	$('#searchResults').html('');
    let content = "";
    let newDiv = $('<div></div>');
    newDiv.text(result);
    $('#searchResults').append(newDiv);
    console.log('new div test', result);
};



//1.  get attractions array (attractionsCall() resolve is array)
//2. create fuse object w/ array
//3. on key up, call fuse,search...
//4. ... print result to sidebar


