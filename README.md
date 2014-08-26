grunt构建工具测试
=========
项目工具
---------
seajs2.3.0                 --https://github.com/seajs/seajs     
nodejs                     --http://www.nodejs.org/      
grunt                      --https://github.com/gruntjs/grunt	
grunt-cmd-transport  	   --https://github.com/spmjs/grunt-cmd-transport  
grunt-cmd-concat  	      --https://github.com/spmjs/grunt-cmd-concat  
grunt-contrib-uglify	      --https://github.com/gruntjs/grunt-contrib-uglify  
grunt-contrib-clean	      --https://github.com/gruntjs/grunt-contrib-clean   
目录结构
---------
```
app                                 -- 业务层js文件夹
   app1                             -- app1项目
       index                        -- 项目首页
            src                     
                index.js            -- 业务js
lib                                 -- base模块,seajs及各种cmd模块都在这里
   seajs                            --
        2.3.0                       -- 2.3.0版本的seajs
             seajs.js               -- seajs文件
             seajs-debug.js         -- seajs开发版
             ...                    -- 其他seajs插件
   jquery
         1.8.2                      -- 1.8.2版本的jquery
               ...                  -- 略过
         1.11.1                     -- 1.11.1版本的jquery
               jquery.js            -- CMD版本jquery
               jquery-debug.js      -- CMD版本的jquery开发版
html                                -- 静态页面
    index   
         index.html                 -- 首页入口
node_moddules                       -- nodejs的模块
   grunt                            -- grunt工具
   grunt-cmd-transport              -- transport工具,用来添加模块ID和模块依赖,例如(define('a',['b.js'],function(require,exports,module){}))
   grunt-cmd-concat                 -- concat工具,合并依赖的模块
   grunt-contrib-uglify             -- uglify工具,压缩文件
   grunt-contrib-clean              -- clean工具,清理文件
src                                 -- 自定义模块源码
   dialog                           -- dialog模块   
         src
            dialog.js               -- dialog.js文件
            dialog_css.css          -- dialog_css.css文件
Gruntfile.js                        -- Gruntfile.js文件,用来自定义grunt任务
package.json                        -- 包文件(name,version,devDependencies...),可通过npm install来安装devDependencies字段中的依赖
seajs-config.js                     -- seajs的配置文件
```
静态页面
--------
**index.html**
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title></title>
</head>
<body>
<input type="button" id="btnDialog" value="show dialog"/>
<script src="../../lib/seajs/2.3.0/sea.js"></script>
<script src="../../lib/seajs/2.3.0/seajs-preload.js"></script>
<script src="../../lib/seajs/2.3.0/seajs-style.js"></script>
<script src="../../seajs-config.js"></script>
<script type="text/javascript">
    seajs.use("../../dist/app/app1/index/src/index.js")
</script>
</body>
</html>
```
> seajs-prelload通过script标签同步引入为的的是在seajs-config.js中配置其他seajs插件的预加载.
>
> seajs-style通过script标签同步引入的原因会在后面讲到.

##seajs配置
**seajs-config.js**
```
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
```
注意:seajs-2.3.0[seajs#1228](https://github.com/seajs/seajs/issues/1228)					
1:去掉css支持，推荐link标签同步引入。如果实在要用，可以用seajs-css插件来完成。          			  
2:preload移除，推荐script标签同步引入。如果实在要用，可以用seajs-preload插件来完成。		
3:去掉根据 sea.js 路径自动猜测 base 路径的功能。交给用户自己配置。		
4:CommonJS规范书写，这其实是spm3的功能：[spmjs/spm#819](https://github.com/spmjs/spm/issues/819)		

##业务模块
**index.js**
```
define(function (require, exports) {
  
    var $ = require("jquery"),
    var Dialog = require("dialog");

    $("#btnDialog").bind("click", function() {
        new Dialog();
    })
});
```
###自定义模块
**dialog.js**
```
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
```
**b.js**
```
define(function(require, exports, module) {

  function B() {
    console.log('B')
  };

  module.exports = B;
})
```
**dialog_css.css**
```
@charset "utf-8";
.dialog{ width: 100%;}
```
grunttest
