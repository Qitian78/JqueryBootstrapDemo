/**
 *@desc 车辆查询结果界面
 *@date 2018/09/28 14:49:32
 *@author zhangziteng
 */
/**
 *@desc 查询表格初始化
 *@date 2018/09/28 17:11:00
 *@author zhangziteng
 */

$(function(){
    $('#result-table-part').bootstrapTable({
        url: AJAX_URL.reportProblem,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        height:  $(window).height() - 180,
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
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
            field: 'Name',
            title: '序号'
        }, {
            field: 'Mobile',
            title: '问题编号'
        }, {
            field: 'Gender',
            title: '类别',
            width:100
        }, {
            field: 'Age',
            title: '标题',
            width:200
        }, {
            field: 'BirthDate',
            title: '提问者用户'
        },{
            field: 'BirthDate',
            title: '提问者时间'
        },{
            field: 'BirthDate',
            title: '问题状态'
        },{
            field:'ID',
            title: '操作',
            width: 220,
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a href="#" onclick="openContinueModal()" data-target="#allproblem-continue" data-toggle="modal">继续提问</a>';
                let b = '<a href="#" onclick="openAllModal()" id="check-allproblem" data-target="#allproblem" data-toggle="modal">查看</a>';
                let c = '<a href="#" onclick="openDeleteModal()">删除</a>';
                return a +'  '+ b +'   '+ c;
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
});