# JqueryBootstrapDemo
# 使用技术及工具

* 工程包管理工具：npm
* 前端项目包管理工具：bower
* 构建工具：gulp
* 开发工具（建议）：WebStorm

# 使用方法

1. 为了安装npm，我们需要首先安装node.js，因为npm是JavaScript的包管理工具，会随着node.js被一起安装
2. 拉取代码后，启动控制台，在项目根目录执行命令npm install bower -g，目的是全局安装bower，以便在控制台使用bower命令
3. 在项目根目录执行命令npm install，此时会自动生成node_modules目录
4. 项目依赖模块下载 完成后，继续在项目根目录执行命令bower install（需要执行完上面的第二步，才能使用bower命令），此时会自动生成bower_components目录
5. bower依赖模块下载完成后，在项目.根目录下执行命令npm start，启动项目

注：启动中如遇报错，可能因为node或bower依赖的包缺少、或者包与当前环境不兼容。建议根据错误信息删除node_modules或bower_components文件夹，重新按照上面的使用说明执行一次。


# 项目结构
<pre>
│  package.json        # 项目配置/项目工具依赖
│  README.md           # 项目说明
│  bower.json          # 前端项目包依赖
│  gulpfile.js         # 项目构建配置文件
│
├─dist                            # 最终打包完的文件会自动放在这里
├─config                          # 项目全局配置文件
└─src
    ├─ index.html              # 项目入口页面
    │
    │
    ├─ css                 # 样式表
    ├─ images              # 图片
    ├─ js                  # js文件
    ├─ jsonDatas           # json数据文件
    ├─ pages               # html文件，文件夹内存放模块文件夹
    ├─ utils               # 工具文件
    │
</pre>
