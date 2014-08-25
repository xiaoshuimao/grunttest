define("dist/src/dialog/src/dialog", [ "lib/jquery/1.11.1/jquery", "./b", "./dialog_css.css" ], function(require, exports, module) {
    var $ = require("lib/jquery/1.11.1/jquery");
    var B = require("./b");
    require("./dialog_css.css");
    new B();
    function Dialog() {
        alert("Dialog");
    }
    module.exports = Dialog;
});