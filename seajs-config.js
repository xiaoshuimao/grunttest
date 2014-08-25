seajs.config({
    base:'../../',
    alias:{
        "seajs-css": "lib/seajs/2.3.0/seajs-css",
        "seajs-style": "lib/seajs/2.3.0/seajs-style",
        "seajs-debug": "lib/seajs/2.3.0/seajs-debug",
        "jquery":"lib/jquery/1.11.1/jquery",

        /*弹窗*/
        "dialog": "src/dialog/src/dialog"
    },
    preload: ['seajs-css', 'seajs-debug'],
    debug:1
});
