/**
 * 答疑管理模块
 *  宣文彬
 *  2018-9-27
 */
//获得表格数据
$(function(){
    $('#show-table-question').bootstrapTable({
        url: AJAX_URL.questionManage,
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
            field: 'questionId',
            title: '问题编号'
        }, {
            align: "center",
            field: 'questionTitle',
            title: '问题标题'
        }, {
            align: "center",
            field: 'questionType',
            title: '问题类型'
        }, {
            align: "center",
            field: 'questioner',
            title: '提问者'
        }, {
            align: "center",
            field: 'questionTime',
            title: '提问时间',
            // formatter: function (value) {
            //     let time = new Date(value);
            //     // return Date.prototype.Format(time);
            // }
        }, {
            align: "center",
            field: 'state',
            title: '状态',
            formatter: function (value) {
                if (value === 1) {
                    return "解答";
                } else {
                    return "未解答";
                }
            }
        }, {
            align: "center",
            field: 'share',
            title: '共享',
            formatter: function (value) {
                if (value === 1) {
                    return "共享";
                } else {
                    return "未共享";
                }
            }
        },{
            align: "center",
            field:'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a href="#" onclick="openDetialModal()" data-target="#detial-modal" data-toggle="modal" style="color: #00b3ee">查看</a>';
                let b = '<a href="#" onclick="shareOne()">共享</a>';

                return a +'  '+ b ;
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
})
/**
 * 时间输入框 执行一个laydate实例
 * 宣文彬
 * 2018-9-27
 */
laydate.render({
    elem: '#questionTime' //指定元素
});

/**
 * 模糊搜索 begin
 * 宣文彬
 * 2018-9-27
 */
$(function(){
    $("#search-submit").on("click", function () {
        let settings = {
            url: AJAX_URL.questionManage,
            method: requestJson ? 'get' : 'post',
            dataType: "json",
            data:{
                "questionTitle": $("#search-input-title").val(),//获得问题标题
                "questionType":$("#select-search").val(),//获得问题分类
                "share":$("#select-share").val(),//是否共享
                "questionTime":$("#questionTime").val(),//提问时间
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
 * 批量删除数据
 * 宣文彬
 * 2018-9-27
 */
$("#delete-button-question").on("click", function () {
    let checkedCount = 0;
    let index;
    let $allRole = $("input[name='btSelectItem']");
    console.log($allRole)
    for (let n = 0; n < $allRole.length; n++) {
        if ($allRole.eq(n).is(":checked")) {
            index = n;
            console.log(index);
            checkedCount++;
        }
    }
    if (checkedCount === 0) {
        poptip.alert(POP_TIP.selectOne);
        return 0;
    }/* else if (checkedCount > 1) {
        poptip.alert("只能选择一个数据删除", {
            title: "提示"
        });
    } */
    else {
        poptip.confirm({
            content: POP_TIP.confirm,
            yes : function(){
                let settings = {
                    url: AJAX_URL.questionManage,
                    method: requestJson ? 'get' : 'post',
                    dataType: "json"
                };
                $.ajax(settings).done(function (data) {
                    console.log(data);
                    if (data.ok) {
                        poptip.alert(POP_TIP.deleteSuccess);
                    } else {
                        poptip.alert(POP_TIP.deleteFail);
                    }
                });
                poptip.close();
            }
        });
    }
});

/**
 * 删除当前选中数据
 * 宣文彬
 * 2018-9-27
 */
function openDeleteModal() {

    poptip.confirm({
        content: '确定删除此条数据？',
        yes: function () {
            console.log('confirm-yes');
            poptip.close();
        },
        cancel: function () {
            console.log('confirm-cancel');
            poptip.close();
        }
    });
}
    /**
     * 共享多条数据
     * 宣文彬
     * 2018-9-27
     */
function share() {
    let checkedCount = 0;
    let index;
    let $allRole = $("input[name='btSelectItem']");

    for (let n = 0; n < $allRole.length; n++) {
        if ($allRole.eq(n).is(":checked")) {
            index = n;
            // $($allRole.eq(n).parent().nextAll("td").get(6)).text("4共享")
            checkedCount++;
        }
    }
    if (checkedCount === 0) {
        poptip.alert(POP_TIP.selectOne);
        return 0;
    }
    else {

    }
}
/**
* 共享当前数据
 * 宣文彬
 * 2018-9-27
*/
function shareOne() {

}

/**
* 查看当前数据，显示详情模态框
* 宣文彬
* 2018-9-27
*/
function openDetialModal() {
    //模态框标题
    $("#model-title").html('<h4>' + ' 答疑详情' + '</h4>')
    //得到当前数据的详细信息

}
/**
* 重置按钮,搜索项变为空
* 宣文彬
* 2018-9-27
*
*/
$("#reset-button").on("click",function () {
    $("#search-input-title").val("");
    $("#select-type").find("option:first").prop("selected", 'selected');;
    $("#search-input-vin").val("");
    $("#select-share").find("option:first").prop("selected", 'selected');;
    $("#choose-input-time").val("");
})


//点击进入分类管理子页面
$("#open-button-categorymanage").on("click",function () {
    window.location.href="category-manage.html";
})

