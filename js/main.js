'use strict';
var template = require('./templates');

template.loadNavbar();
template.loadAreas();
document.getElementById("demo").innerHTML = Date();
