seajs.config({
    /*模块系统的基础路径
     ** 基于seajs.js文件的路基   
     ** 2.3.0去掉根据sea.js路径自动猜测base路径的功能.交给用户自己配置
    */
    base:'../../',
    /*别名配置*/
    alias:{
        "seajs-css": "lib/seajs/2.3.0/seajs-css",
        "seajs-style": "lib/seajs/2.3.0/seajs-style",
        "seajs-debug": "lib/seajs/2.3.0/seajs-debug",
        "jquery":"lib/jquery/1.11.1/jquery",

        /*弹窗*/
        "dialog": "src/dialog/src/dialog"
    },
    /*预加载,
     ** 2.3.0 preload移除
     ** preload无序加载
     ** seajs-debug需要提前加载seajs-style
    */
    preload: ['seajs-css', 'seajs-debug'],
    /*.js结尾的文件全部改成加载-debug.js*/
    // map:[['.js','-debug.js']],
    debug:1
});
