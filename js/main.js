'use strict';
var template = require('./templates');
var time = require('./time');

template.loadNavbar();
template.loadAreas();
time.loadTimeData();
document.getElementById("demo").innerHTML = Date();
