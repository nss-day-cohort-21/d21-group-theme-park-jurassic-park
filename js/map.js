let Data = require('./data_loader.js');
let MapGrid = {};
let attractionsArr = [];

//0. attractions call
MapGrid.appendMap = (areaId) => {
	Data.attractionsCall().then(function(data){
		attractionsArr = [];
		data.forEach(item => {
			if (item.area_id === areaId) {
				attractionsArr.push(item);
			}
		});
		createGrid(attractionsArr ,getDimensions(attractionsArr.length), areaId);
	});

}

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

window.addEventListener('click', function(e) {
	$('.map-col').html('');
	let img = document.createElement('img');
	img.setAttribute('src', 'images/pin.svg');
	img.classList.add('pin');
	if(e.target.hasAttribute('aria-controls')){
		let colId = e.target.getAttribute('aria-controls');
		let div = document.querySelector('.col-' + colId);
		div.appendChild(img);
	}
});














































module.exports = MapGrid;