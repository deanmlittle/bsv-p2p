'use strict';

var gulp = require('gulp');
var bitcoreTasks = require('bitcore-build');

const p2p = bitcoreTasks('p2p', {skipBrowser: false});
console.log(p2p)
//exports.default = gulp.series(p2p["coverage"]);
module.exports = p2p