define("dist/app/app1/index/src/index", [ "lib/jquery/1.11.1/jquery", "dist/src/dialog/src/dialog" ], function(require, exports) {
    var $ = require("lib/jquery/1.11.1/jquery"), Dialog = require("dist/src/dialog/src/dialog");
    $("#btnDialog").bind("click", function() {
        new Dialog();
    });
});