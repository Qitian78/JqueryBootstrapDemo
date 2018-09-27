/**
 * 模块：公告管理模块
 * 创建人崔玉鑫
 * 创建日期20180927
 */

/**
 * 默认加载内容
 * 创建人崔玉鑫
 * 创建日期20180927
 */
$(function () {
    //加载初始的表格数据
    serchTable(AJAX_URL.announceData,null);
    //加载初始时间控件渲染
    layDateRender();
})

/**
 * 模糊搜索
 * 创建人崔玉鑫
 * 创建日期20180927
 */
function searchSubmit(){
    let data={
        "announceTitle": $("#title-search").val(),//获得公告输入框
        "publisher": $("#publisher-search").val(),//获得发布者输入框
        "announcePublishBeginDate":$("#begin-time-search").val(),//开始时间
        "announcePublishEndDate":$("#end-time-search").val(),//结束时间
    }
    serchTable(AJAX_URL.announceData,data);//请求后台加载表格数据
}
/**
 * 时间控件渲染
 * 创建人崔玉鑫
 * 创建日期20180927
 */
function layDateRender(){
    laydate.render({
        elem: '#begin-time-search' //指定元素
        , format: 'yyyy年MM月dd日' //可任意组合
        , theme: '#393D49'          //颜色主体
        /*
        ,min: '09:30:00'                //  最小值
        ,max: '17:30:00'                //最大值
         */
        //控件选择完毕后的回调,点击日期、清空、现在、确定均会触发。
        , done: function (value, date, endDate) {
            console.log(value); //得到value
        }
    });
    laydate.render({
        elem: '#end-time-search' //指定元素
        , format: 'yyyy年MM月dd日' //可任意组合
        , theme: '#393D49'
        //控件选择完毕后的回调,点击日期、清空、现在、确定均会触发。
        , done: function (value, date, endDate) {
            // startData = Number(new Date(value));
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        }
    });
}
/**
 * 公告详情 即“查看”超链接
 * @param announceId 用于提交给后台的id来查询详细信息
 * 创建人崔玉鑫
 * 创建日期20180927
 */
function openDetialModal(announceId) {
    $.ajax({
        url: AJAX_URL.announceDetailData,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            if(data){
                let i = 0;
                for(let key in data){
                    let actorData = data[key]
                    $.each(actorData, function (inde, item) {
                        $("#model-title").html(actorData[inde].modelTitle);
                        $("#modal-update-window").html(actorData[inde].modalUpdateWindow)
                        $("#modal-update-content").html(actorData[inde].modalUpdateContent)
                        $("#modal-update-effect").html(actorData[inde].modalUpdateEffect)
                    })

                }
            }
        }
    });
}
/**
 * 表格拉取数据渲染
 * @param URL 提交的接口
 * @param searchdate 提交的data数据
 * 创建人崔玉鑫
 * 创建日期20180927
 */
function serchTable(URL,searchdate){
    $('#announce-table').bootstrapTable({
        url: URL,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        date:searchdate,
        //toolbar: '#toolbar',              //工具按钮用哪个容器
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
        paginationDetailHAlign: 'right',
        //得到查询的参数
        queryParams: function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                rows: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
        },
        columns: [
            /*{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, */{
                order: "asc",
                field: 'logkey',
                align: "center",
                valign: "middle",
                title: "序号",
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },{
                field: 'announceTitle',
                title: '标题'
            }, {
                field: 'publisher',
                align: "center",
                title: '发布者'
            }, {
                field: 'announcePublishDate',
                align: "center",
                title: '发布时间'
            }, {
                field: 'announceId',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    //通过formatter可以自定义列显示的内容
                    //value：当前field的值，即id
                    //row：当前行的数据
                    let a = '<a href="#" onclick="openDetialModal('+value+')" data-target="#announce-detail" data-toggle="modal" style="color: blue">查看</a>';
                    return a ;
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
        responseHandler: function (data) {
            return data.rows;
        }
    });
}