define("dist/app/app1/index/src/index-debug", [ "lib/jquery/1.11.1/jquery-debug", "dist/src/dialog/src/dialog-debug" ], function(require, exports) {
    var $ = require("lib/jquery/1.11.1/jquery-debug");
    var Dialog = require("dist/src/dialog/src/dialog-debug");
    $("#btnDialog").bind("click", function() {
        new Dialog();
    });
});