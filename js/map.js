let Data = require('./data_loader.js');
let MapGrid = {};
let attractionsArr = [];

//call attractions for a given area
MapGrid.appendMap = (areaId) => {
	Data.attractionsCall().then(function(data){
		attractionsArr = [];
		data.forEach(item => {
			if (item.area_id === areaId) {
				attractionsArr.push(item);
			}
		});
		//create map with attractions data
		createGrid(attractionsArr ,getDimensions(attractionsArr.length), areaId);
	});

}

//get map dimensions based on number of attractions
function getDimensions(num) {
	let arr = [];
	let h, w = Math.ceil(Math.sqrt(num));
	while (w !== num) {
		if (num % w === 0){
			h = num / w;
			break;
		} else {
			w++;
		}
	}
	arr.push(h,w);
	return arr;
}

//create grid based on dimensions from number of attractions
function createGrid(attractionsArr, dimensionsArr, appendId) {
	let $map = $('<div></div>').addClass('map-grid');
	let count = 0;
	for(let i = 1; i <= dimensionsArr[0]; i++) {
		let $row = $('<div></div>').addClass('map-row');
		for(let j = 1; j <= dimensionsArr[1]; j++) {
			let $col = $('<div> </div>').addClass('map-col');
			$col.addClass('col-' + attractionsArr[count].id);
			$row.append($col);
			count++;
		}
		$map.append($row);
	}
	$('#' + appendId).append($map);
};

//listen for a clicks, onclick append pin img to specified div in map grids
window.addEventListener('click', function(e) {
	$('.map-col').html('');
	let img = document.createElement('img');
	img.setAttribute('src', 'images/pin.svg');
	img.classList.add('pin');
	if (e.target.hasAttribute('aria-controls')){
		let colId = e.target.getAttribute('aria-controls');
		let div = document.querySelector('.col-' + colId);
		div.appendChild(img);
	}
});

module.exports = MapGrid;