let MapGrid = {};
let areaIdArr = [];

MapGrid.getAreaIds = (data) => {
	_.forEach(data, function(item) {
		areaIdArr.push(item.id);
	});
	console.log("area ids",areaIdArr );
}

function getDimensions(num) {
	n = Math.ceil(Math.sqrt(num));
}

module.exports = MapGrid;