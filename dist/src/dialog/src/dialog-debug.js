/*! gruntTest - v0.0.1 - 2014-08-28 */
define("dist/src/dialog/src/dialog-debug", [ "lib/jquery/1.11.1/jquery-debug", "./b-debug", "./dialog_css-debug.css" ], function(require, exports, module) {
    var $ = require("lib/jquery/1.11.1/jquery-debug");
    var B = require("./b-debug");
    require("./dialog_css-debug.css");
    new B();
    function Dialog() {
        alert("Dialog");
    }
    module.exports = Dialog;
});

define("dist/src/dialog/src/b-debug", [], function(require, exports, module) {
    function B() {
        console.log("B");
    }
    module.exports = B;
});

define("dist/src/dialog/src/dialog_css-debug.css", [], function() {
    seajs.importStyle('@charset "utf-8";.dialog{width:100%}');
});
