define(function (require, exports) {

    var $ = require("jquery"),
        Dialog = require("dialog");
    $("#btnDialog").bind("click", function () {
        new Dialog();
    })
});