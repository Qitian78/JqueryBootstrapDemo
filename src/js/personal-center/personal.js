/**
 * @Desc 个人信息页面
 * @Date 2018-09-17 00:52:23
 * @Author qitian
 */
let MAX_FILE_NUM = 2;
$(function(){
    laydate.render({
        elem: '#birthday',
        type: 'month',
        max: new Date().Format('yyyy-MM'),
        done: function (value) {

        }
    });
    //实例化一个plupload上传对象
    let uploader = new plupload.Uploader({
        browse_button : 'uploads', //触发文件选择对话框的按钮，为那个元素id
        container: 'imgs-preload',
        url : 'http://106.2.13.200:8082/QYS//api/business/applymember/updateIDPhoto', //服务器端的上传页面地址
        filters: {
            mime_types : [ //只允许上传图片
                { title : "Image files", extensions : "jpg,gif,png,jpeg" }
            ],
            max_file_size : '5M', //最大只能上传5M的文件
            prevent_duplicates : true ,//不允许选取重复文件
            unique_names: true
        }
    });

    //在实例对象上调用init()方法进行初始化
    uploader.init();

    //绑定各种事件，并在事件监听函数中做你想做的事
    uploader.bind('FilesAdded',function(uploader,addFiles){
        console.log(addFiles)
        var oldLen = uploader.files.length - addFiles.length;

        // 根据最大文件数量截取
        uploader.files.splice(MAX_FILE_NUM, uploader.files.length);
        addFiles = addFiles.slice(0, MAX_FILE_NUM - oldLen);

        // 对addFiles分别生成base64编码，用于预览
        $.each(addFiles || [], function(i, file) {

            if (!file || !/image\//.test(file.type)) return; //确保文件是图片
            if (file.type == 'image/gif') {//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
                var fr = new mOxie.FileReader();
                fr.onload = function () {
                    file.imgsrc = fr.result;
                    fr.destroy();
                    fr = null;
                }
                fr.readAsDataURL(file.getSource());
            } else {
                var preloader = new mOxie.Image();
                preloader.onload = function () {
                    preloader.downsize(180, 120);//先压缩一下要预览的图片
                    var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                    file.imgsrc = imgsrc;
                    preloader.destroy();
                    preloader = null;
                };
                preloader.load(file.getSource());
            }

        });

    });
    uploader.bind('UploadProgress',function(uploader,file){
            console.log(file.getNative())
    });

    //最后给"开始上传"按钮注册事件
    document.getElementById('start_upload').onclick = function(){
        uploader.start(); //调用实例对象的start()方法开始上传文件，当然你也可以在其他地方调用该方法
    }

});
function preloadImg(url){
    $('#imgs-preload').append('<img src="'+url+'"/>');
}

//有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if (!file || !/image\//.test(file.type)) return;
    if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function() {
            callback(fr.result);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    } else {
        var preloader = new mOxie.Image();
        preloader.onload = function() {
            preloader.downsize(300, 300); //先压缩一下要预览的图片,宽300，高300
            var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load(file.getSource());
    }
}

/**
 * @Desc 保存按钮出发事件
 * @Param modalId模态框id,checkFormItem
 * @Date 2018-09-17 00:47:31
 * @Author qitian
 */

function saveInfo(modalId){
    poptip.alert(POP_TIP.saveSuccess);
}
function tabGo(){
    $('#login-log-table').bootstrapTable({
        url: AJAX_URL.loginLog,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        //showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams : function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                rows: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, {
            field: 'Name',
            title: '姓名'
        }, {
            field: 'Mobile',
            title: '手机'
        }, {
            field: 'Gender',
            title: '性别'
        }, {
            field: 'Age',
            title: '年龄'
        }, {
            field: 'BirthDate',
            title: '出生日期'
        },{
            field:'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a href="#" onclick="openAlertModal()">测试</a>';
                return a;
            }
        }, ],
        onLoadSuccess: function (e) {
            console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function(data){
            return data.rows;
        }
    });
}
function openAlertModal() {
    poptip.confirm({
        content: POP_TIP.confirm,
        yes: function(){
            console.log('confirm-yes');
            poptip.close();
        },
        cancel:function(){
            console.log('confirm-cancel');
            poptip.close();
        }
    });
}
