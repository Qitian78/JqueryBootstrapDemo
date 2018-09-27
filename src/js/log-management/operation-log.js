/**
 * 操作日志模块
 *  宣文彬
 *  2018-9-27
 */
//获得表格数据
$(function(){
    $('#show-table-operationlog').bootstrapTable({
        url: AJAX_URL.operationLogData,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
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
        showRefresh: false,                  //是否显示刷新按钮
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
            align: "center",
            field: 'trajectoryId',
            title: '轨迹ID'
        }, {
            align: "center",
            field: 'state',
            title: '状态'
        }, {
            align: "center",
            field: 'operationTime',
            title: '操作时间'
        }, {
            align: "center",
            field: 'user',
            title: '用户名'
        }, {
            align: "center",
            field: 'companyAbbreviation',
            title: '企业简称',
        }, {
            align: "center",
            field: 'operationModular',
            title: '操作模块',
        }, {
            align: "center",
            field: 'operationContent',
            title: '操作内容',
        },{
            align: "center",
            field: 'operationIP',
            title: '操作ip',
        },
        ],
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
})

/**
 * 时间输入框 执行一个laydate实例
 * 宣文彬
 * 2018-9-27
 */
laydate.render({
    elem: '#choose-input-time',//指定元素
    range: true
});

/**
 * 模糊搜索 begin
 * 宣文彬
 * 2018-9-27
 */
$(function(){
    $("#search-button").on("click", function () {
        let settings = {
            url: AJAX_URL.operationLogData,
            method: requestJson ? 'get' : 'post',
            dataType: "json",
            data:{
                "state": $("#select-state").val(),//获得状态
                "operationTime":$("#choose-input-time").val(),//提问时间
            }
        };
        $.ajax(settings).done(function (data) {
            if (data.ok) {
                poptip.alert(POP_TIP.loadSuccess);
            } else {
                console.log('失败')
            }
        });
    })

})
//模糊搜索 end
/**
 * 重置按钮,搜索项变为空
 * 宣文彬
 * 2018-9-27
 *
 */
$("#reset-button").on("click",function () {
    $("#select-state").find("option:first").prop("selected", 'selected');;
    $("#choose-input-time").val("");
})


