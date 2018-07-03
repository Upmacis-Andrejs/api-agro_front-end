// Vendor resources (normalize.css, jquery, modernizr and plugins by your choice)
'use strict';

require("./vendor/normalize.min.css");
require("./vendor/modernizr-2.7.1.min.js");
window.$ = window.jQuery = require("./vendor/jquery-3.3.1.min");

// Your own CSS files
require("./scss/style.scss");

// Your own javascript files
require("./js/app.js");