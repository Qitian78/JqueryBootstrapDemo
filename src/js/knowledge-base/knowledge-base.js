//获得表格数据
$(function(){
    $('#knowledge-table').bootstrapTable({
        url: AJAX_URL.knowledgeData,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
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
            field: 'knowledgeId',
            title: '知识点编号'
        }, {
            field: 'knowledgeTitle',
            title: '知识点标题'
        }, {
            field: 'knowledgeCategory',
            title: '知识点分类'
        }, {
            field: 'publisher',
            title: '发布者'
        }, {
            field: 'pageView',
            title: '浏览量(万)'
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
                let a = '<a href="#" onclick="openDetialModal()" data-target="#my-modal" data-toggle="modal">查看</a>';
                let b = '<a href="#" onclick="openEditorModal()" data-target="#my-modal" data-toggle="modal">编辑</a>';
                let c = '<a href="#" onclick="openDeleteModal()">删除</a>';
                return a +'  '+ b +'  '+ c;
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

//模糊搜索 begin
$(function(){
    $("#search-submit").on("click", function () {
        let settings = {
            url: AJAX_URL.knowledgeData,
            method: requestJson ? 'get' : 'post',
            dataType: "json",
            data:{
                "knowledgeTitle": $("#title-search").val(),//获得知识点标题
                "knowledgeCategory":$("#select-search").val(),//获得知识分类
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

//添加一条数据
function openAddModal() {
    $("#modelTitle").html('<h4>' + ' 新增知识点' + '</h4>')
    $("#knowledge-add-btn").on("click", function () {
        let modal = $("#");//还原，置空
        modal.find("input").eq(0).val("");//将模态框中的数据清空
        modal.find("input").eq(1).val("");
        modal.find("input").eq(2).val("");
        modal.find("select").eq(0).find("option:first").prop("selected", 'selected');
        $.ajax({
            turl: AJAX_URL.knowledgeData,
            method: requestJson ? 'get' : 'post',
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data) {
                if (data.ok) {
                    if (!data.data) {
                    }
                } else {
                    poptip.alert(data.message);
                }
            }
        });
    });
}
//批量删除数据
$("#delete-knowledge").on("click", function () {
    let checkedCount = 0;
    let index;
    let $allRole = $("input[name='btSelectItem']");
    for (let n = 0; n < $allRole.length; n++) {
        if ($allRole.eq(n).is(":checked")) {
            index = n;
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
                    url: AJAX_URL.knowledgeData,
                    method: requestJson ? 'get' : 'post',
                    dataType: "json"
                };
                $.ajax(settings).done(function (data) {
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

//删除一条数据
function openDeleteModal() {

    poptip.confirm({
        content: '确定删除此条数据？',
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
//修改一条数据
function openEditorModal() {
    //模态框标题
    $("#modelTitle").html('<h4>' + ' 修改知识点' + '</h4>')
    //得到当前数据的详细信息
    $("#inputTitle").val('如何按照车型搜索备件？')
    $("#inputCategory").val('备件问题')
    $("#inputPublisher").val('总管理员dall')
    $("#inputNum").val('3')
}
//查看一条数据
function openDetialModal() {
    //模态框标题
    $("#modelTitle").html('<h4>' + ' 知识点详情' + '</h4>')
    //得到当前数据的详细信息
    $("#inputTitle").val('如何按照车型搜索备件？')
    $("#inputCategory").val('备件问题')
    $("#inputPublisher").val('总管理员dall')
    $("#inputNum").val('3')
}