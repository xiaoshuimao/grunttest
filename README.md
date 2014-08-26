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
模块详解
---------
###业务模块
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
