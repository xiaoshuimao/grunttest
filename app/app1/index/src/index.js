define(function (require, exports) {
  
    var $ = require("jquery");
    var Dialog = require("dialog");

    $("#btnDialog").bind("click", function() {
        new Dialog();
    })
});