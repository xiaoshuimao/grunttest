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
    seajs.importStyle('@charset "utf-8";.dialog-overlay{opacity:.5;filter:alpha(opacity:50);background:#ccc;width:100%;height:100%}.dialog{border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;padding:5px;background:url(http://cache.house.sina.com.cn/esalesleju/v2/common/popup/bg01.png);_background:none #c6c6c6}.dialog_inner{float:left;border:1px solid #ACACAC;background:#FFF}.dialog .bar{position:relative;cursor:move;height:31px;line-height:31px;padding:0 10px;border:1px solid #FFF;background:url(http://cache.house.sina.com.cn/esalesleju/v2/common/popup/bg02.png);overflow:hidden}.dialog .bar .title{float:left;white-space:nowrap;font-weight:700;color:#5a5a5a}.dialog .bar .close{color:#fff;cursor:pointer;text-decoration:none;text-indent:-9999px;z-index:10;float:right;display:inline;margin:5px 0;width:20px;height:20px;overflow:hidden;background:url(http://cache.house.sina.com.cn/esalesleju/v2/common/popup/bg02.png) 0 -32px}.dialog .Dcontent{float:left;padding:0;background:#fff;border:1px solid #FFF;border-top:0}.dialog .Dcontent iframe{float:left;vertical-align:bottom}');
});
