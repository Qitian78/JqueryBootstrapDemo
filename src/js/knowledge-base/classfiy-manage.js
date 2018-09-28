/*
*作者：岳奔
*时间：2018年9月26号
*
*/
//获得表格数据
$(function() {
    $('#classfiy-table').bootstrapTable({
        url: AJAX_URL.knowledgeData,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        //paginationShowPageGo: true,         //是否开启跳转翻页功能
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
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'knowledgeCategory',
            title: '分类名称'
        },{
            field:'ID',
            title: '操作',
            width: 240,
            align: 'center',
            valign: 'middle',
            formatter:function (value,row,index) {
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a class="classfiy-cz1" href="#" data-target="#my-modal" data-toggle="modal">查看</a>';
                let b = '<a class="classfiy-cz1" href="#" data-target="#my-modal" data-toggle="modal">编辑</a>';
                let c = '<a class="classfiy-cz2" href="#" >删除</a>';
                return a + '  ' + b + '  ' + c;
            }
        },],
        onLoadSuccess: function (e) {
            console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function(data) {
            return data.rows;
        }
    });
})

