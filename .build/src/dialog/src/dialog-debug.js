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