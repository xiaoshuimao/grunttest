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
node_modules                       -- nodejs的模块
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


## seajs配置
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
    preload: ['seajs-css'],
    /*.js结尾的文件全部改成加载-debug.js*/
    // map:[['.js','-debug.js']],
    debug:1
});
```
注意:seajs-2.3.0[seajs#1228](https://github.com/seajs/seajs/issues/1228)					
*  去掉css支持，推荐link标签同步引入。如果实在要用，可以用seajs-css插件来完成。          			  
*  preload移除，推荐script标签同步引入。如果实在要用，可以用seajs-preload插件来完成。		
*  去掉根据 sea.js 路径自动猜测 base 路径的功能。交给用户自己配置。		
*  CommonJS规范书写，这其实是spm3的功能：[spmjs/spm#819](https://github.com/spmjs/spm/issues/819)		

> 通过link标签在index.html引入seajs-preload.js来开启preload功能   
>     
> >   *  seajs-style通过script标签同步引入,是由于preload无序加载配置项中的文件,而seajs-debug.js需要seajs.importStyle
>
> base配置项指模块系统的基础路径,基于seajs.js文件的位置.
>
> >   *  如果该文件父级目录是版本号会被略过，方便管理各个版本的seajs.
>        
> >   *  seajs2.3.0版本中交给用户自己配置.      
>        
> >   *  该项目中seajs.js位置在lib/seajs/2.3.0/下, 由于seajs.js文件父级目录为版本号,会被略过.即配置路径base:'../../'  
>
>  alias别名配置
> >   *  配置路劲别名,方便后期require                 
> >   例如:             
> >   'jquery':'lib/jquery/1.11.1/jquery'                                                                
> >   require('jquery') ----> lib/jquery/1.11.1/jquery
>
>  paths路径配置
> >   *  如果目录过深,可以配置该项           
> >   例如:       				         										
> >   paths:{'a':'a/b/c'}				
> >	  alias:{'jquery':'lib/a/1.11.1/jquery'}					
> >	  require('jquery')----->lib/a/b/c/1.11.1/jquery
>
>  map映射(支持正则)                
> >   例如:                      
> >   map:[['.js','-debug.js']]              
> >   jquery.js--------->jquery-debug.js



## 业务模块
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
> 按照cmd规范定义业务模块
> > define(function(require, exprots, module){})
> > require,exprots,module 3个按需定义
>
> 引入jquery, dialog             
> 
> 绑定事件              
 

## 自定义模块
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
>  dialog模块功能就是alert('Dialog'),作为测试用.      
>                                      
>  引入jquery,b模块以及dialog_css样式模块.

**b.js**
```
define(function(require, exports, module) {

  function B() {
    console.log('B')
  };

  module.exports = B;
})
```
>  模块功能输出B,只为构建测试用,不要在意细节.. 

**dialog_css.css**

```
@charset "utf-8";
.dialog{ width: 100%;}
```
>  样式只为构建测试,不要在意细节.  


## 静态页面
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
    seajs.use("../../app/app1/index/src/index.js")
</script>
</body>
</html>
```
> *   seajs-prelload通过script标签同步引入为的的是在seajs-config.js中配置其他seajs插件的预加载.
>
> *   seajs-style通过script标签同步引入.

*  到这里位置,如果没问题,打开index.html,能够在页面上看到alert('B')的弹窗.

## 构建
*  下面正式开始对项目的构建.
*  构建的工具是基于nodejs的环境.首相你必须下载nodejs并安装好.
*  理论上如果了解seajs或者nodejs,应该对package.json不陌生.下面也会稍微做介绍
*  构建模块需要用到grunt-cli,grunt,transport,concat,uglify,clean 4个模块.
*  grunt-cli是npm instal grunt-cli -g全局安装,grunt-cli是grunt管理模块,方便管理不同版本的grunt

### package.json配置文件
**package.json**
```
{  
  "name": "gruntTest",
  "version": "0.0.1",
  "author": "w567675",
  "email": "403724532@qq.com",
  "options": {
    "alias": {
        "jquery": "lib/jquery/1.11.1/jquery",

        "dialog": "dist/src/dialog/src/dialog"
    }
  },
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-cmd-transport": "~0.2.0",
    "grunt-cmd-concat": "~0.2.0",
    "grunt-contrib-uglify": "~0.2.0",
    "grunt-contrib-clean": "~0.4.0"
  }
}
```
##### 字段
*  name  
>  你的模块ID,必须且唯一 

*  version
>  你的模块的版本号,必须.一般由3段数字组成(0.1.0)

*  author
>  该模块的第一位作者

*  email
>  方便别人联系你

*  options
>  自定义的字段,名称随便取,如果要兼容spm构建工具请命名为spm
> > * alias 字段和seajs-config.js的alias一样.为transport任务提供模块依赖的别名.
>
> > * 这里dialog字段比seajs-config.js路径多一个dist路径.因为dialog模块会先构建在dist文件中.为了app文件中的index.js构建时直接获取dist里的dialog依赖.

*  devDependencies
>  依赖模块
> > * 这里依赖5个模块,可以通过npm install命令自动下载依赖的模块到当前目录的node_modules目录中. 如果当前不存在node_modules目录,则继续继续向上查找.(nodejs的路径查询).
>
> > * 你也可以实现通过npn insrtall xx --save-dev ，安装xx模块并且把模块依赖写入保存到package.json文件的devDependencies字段中
>
> > * 这里{key:value} 对应你写的name和version,所以name和version必须写,方便别人install你的模块.
    
更多详细可以这个[npm的package.json中文文档 #6](https://github.com/ericdum/mujiang.info/issues/6)

### grunt任务配置
**Gruntfile.js**
```
module.exports = function (grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    transport: {
      options: {
        paths: ['.'],
        include: 'relative',
        alias: '<%= pkg.options.alias %>',
        parsers: {
          '.js': [script.jsParser],
          '.css': [style.css2jsParser],
          '.html': [text.html2jsParser]
        }
      },

      dialog: {
        options: {
          idleading: 'dist/src/'
        },

        files: [
          {
            cwd: 'src/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/src'
          }
        ]
      },

      app1: {
        options: {
          idleading: 'dist/app/'
        },

        files: [
          {
            cwd: 'app',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/app'
          }
        ]
      }
    },

    concat: {
      options: {
        paths: ['.'],
        include: 'relative',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      dialog: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['src/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },

      app1: {
        options: {
          include: 'all'
        },
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['app/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    uglify: {
      dialog: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['src/**/*.js', '!src/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },

      app1: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['app/**/*.js', '!app/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    clean: {
      spm : ['.build']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.registerTask('dialog', ['transport:dialog', 'concat:dialog']);
  // grunt.registerTask('app1', ['transport:app1', 'concat:app1']);
  grunt.registerTask('dialog', ['transport:dialog', 'concat:dialog', 'uglify:dialog', 'clean']);
  grunt.registerTask('app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
};
```
##### gruntFile.js一般结构
```
module.exports = function (grunt){
   grunt.initConfig({
      ...
   })
}
```
> 这个是grunt统一写法.grunt.initConfig({...})函数里面开始配置任务.

##### 模块中require(css)

如果模块中require了一个css，需要通过将该css转换成js文件，这样seajs就能把该css通过sea-style插件的seajs.importStyle函数插入一个link标签到Html中.
```
   var transport = require('grunt-cmd-transport');
   var style = transport.style.init(grunt);
   var text = transport.text.init(grunt);
   var script = transport.script.init(grunt);
```
> 引入transport模块

```
  transport: {
      options: {
        ...
        parsers: {
          '.js': [script.jsParser],
          '.css': [style.css2jsParser],
          '.html': [text.html2jsParser]
        }
        ...
      }
      ...
   }
```
> 在具体的任务(task)中配置转换模式.
> [转换过程详细可以参看spm](http://docs.spmjs.org/doc/build-task#js-依赖的-css-文件)

##### 配置任务和目标(task,target)
* 任务task一般格式
```
   xxx: {
      options:{
         ...
      },
      a:{
         files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['xx.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      b :{
         options:{
            ....
         }
         .....
      }
   }
```
> xxx为任务task，a和b为目标
>
> 任务级别的options被目标级别的options覆盖


* transport 添加模块id及其依赖
```
transport: {
      options: {
        paths: ['.'],
        alias: '<%= pkg.options.alias %>',
        parsers: {
          '.js': [script.jsParser],
          '.css': [style.css2jsParser],
          '.html': [text.html2jsParser]
        }
      },

      dialog: {
        options: {
          idleading: 'dist/src/'
        },

        files: [
          {
            cwd: 'src/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/src'
          }
        ]
      }
```
> 

待续...


grunttest
