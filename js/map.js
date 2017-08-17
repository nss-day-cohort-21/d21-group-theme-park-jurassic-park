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
		console.log("attractions arr ", attractionsArr);
		createGrid(attractionsArr ,getDimensions(attractionsArr.length), areaId);
	});

}

//1.  load attractionsArr


//2. pass attractionsArr.length to getDimensions


//3.  pass dimensions and area_id in data to createGrid

//4.  call function chain in templates.loadAreas


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
	console.log("dimensions arr", arr);
	return arr;
}

function createGrid(attractionsArr, dimensionsArr, appendId) {
	let $map = $('<div></div>').addClass('map-grid');
	let count = 0;
	for(let i = 1; i <= dimensionsArr[0]; i++) {
		let $row = $('<div></div>').addClass('map-row');
		for(let j = 1; j <= dimensionsArr[1]; j++) {
			let $col = $('<div> </div>').addClass('map-col', attractionsArr[count].id);
			$row.append($col);
			count++;
		}
		$map.append($row);
	}
	$('#' + appendId).append($map);
};

module.exports = MapGrid;