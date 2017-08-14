'use strict';
var Park = {};
let _attractionsArr = [];

//load attractions from firebase
Park.loadAttractionsList = () => {
	return new Promise((resolve, reject) => {
		$.ajax ({
			url: 'https://android-chat-app-c66de.firebaseio.com/attractions.json'
		}).done(function(data){
			resolve(data);

		});
	});
};

//return attractions objects that match search string
//CHANGE 'SWISS FAMILY TREEHOUSE' TO SEARCH.VAL()
Park.loadAttractionsList()
	.then(function(data){
		let $a = $('<a></a>');
		data.forEach((item, index)=>{
			if (item.name === 'Swiss Family Treehouse') {
				_attractionsArr.push(item);
				console.log("a", $a);
				$a.attr('href', '#');
				$a.text(item.name);
			}
			$('body').append($a);
		});
		console.log("attractions", _attractionsArr);
	})

// module.exports = Park;