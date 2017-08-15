'use strict';
var Park = {

// attractionsArr: [],

//load attractions from firebase
loadAttractionsList: function () {
		$.ajax ({
			url: 'https://android-chat-app-c66de.firebaseio.com/attractions.json'
		}).done(function(data){
			this.createArray(data);

		});
},

//create attractions array w/ attractionsList

createArray: function (data) {
	let attractionsArr = [];
	data.forEach((item)=>{
		attractionsArr.push(item.name);
	});
			// console.log("attractions array: ", arr);
	return attractionsArr;
}
};
console.log(Park.loadAttractionsList());

module.exports = Park;