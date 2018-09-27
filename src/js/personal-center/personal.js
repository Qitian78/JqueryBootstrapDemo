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
});


/**
 * @Desc 保存按钮出发事件-弹出框示例
 * @Date 2018-09-17 00:47:31
 * @Author qitian
 */

function saveInfo(){
    poptip.alert(POP_TIP.saveSuccess);
}

/**
 * @Desc 登录日志tab跳转
 * @Date 2018-09-19 10:06:12
 * @Author qitian
 */

function tabGo(){
    $('#login-log-table').bootstrapTable({
        url: AJAX_URL.loginLog,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        height:  $(window).height() - 180,
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

/**
 * @Desc 确认框示例
 * @Date 2018-09-19 10:06:43
 * @Author qitian
 */

function openAlertModal() {
    poptip.confirm({
        content: POP_TIP.confirm,
        yes: function(){
            console.log('confirm-yes');
            pageToDo('fileupload.html');
            poptip.close();
        },
        cancel:function(){
            console.log('confirm-cancel');
            poptip.close();
        }
    });
}
