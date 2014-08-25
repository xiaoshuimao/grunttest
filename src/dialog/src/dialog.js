define(function(require, exports, module) {
    var $ = require("jquery");
    var B = require("./b");
    require("./dialog_css.css");
    
    new B();
    
    function Dialog() {  
        alert('Dialog')
    }
    module.exports = Dialog;
})
