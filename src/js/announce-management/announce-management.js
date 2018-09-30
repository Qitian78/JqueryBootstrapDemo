/**
 * 公告管理模块
 *  宣文彬
 *  2018-9-28
 */
var ue;
//获得表格数据
$(function(){
    $('#show-table-announce').bootstrapTable({
        url: AJAX_URL.announceManagementData,
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
            field: 'announceTime',
            title: '发布时间'
        }, {
            align: "center",
            field: 'announceUser',
            title: '发布者'
        }, {
            align: "center",
            field: 'announceId',
            title: '公告ID'
        }, {
            align: "center",
            field: 'announceCategory',
            title: '分类'
        }, {
            align: "center",
            field: 'announceState',
            title: '状态',
            formatter: function (value) {
                if (value === 1) {
                    return "已发布";
                } else {
                    return "草稿";
                }
            }
        },{
            align: "center",
            field:'operation',
            title: '操作',
            width: 200,
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a href="#" onclick="openUpdateModal()" data-target="#add-accouncemodal" data-toggle="modal" style="color: #00b3ee">编辑</a>';
                let b = '<a href="#" onclick="openDetialModal()" data-target="#add-accouncemodal" data-toggle="modal" style="color: #00b3ee">查看</a>';
                let c = '<a href="#" onclick="announce()">发布</a>';

                return a +'  '+ b +' '+c;
            }
        }, ],
        onLoadSuccess: function (e) {
            // console.log(e)
            var data = e;
            console.log(data);
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
 * 初始化Ueditor富文本编辑器
 */

$(function () {
     ue = UE.getEditor('add-script-editor', {
        toolbars: [
            [
                'undo', //撤销
                'bold', //加粗
                'underline', //下划线
                'preview', //预览
                'horizontal', //分隔线
                'inserttitle', //插入标题
                'cleardoc', //清空文档
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'simpleupload', //单图上传
                'insertimage', //多图上传
                'attachment', //附件
                'music', //音乐
                'inserttable', //插入表格
                'emotion', //表情
                'insertvideo', //视频
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对
                'justifyjustify', //两端对齐
                'forecolor', //字体颜色
                'edittip ', //编辑提示
                'customstyle', //自定义标题
                'template', //模板
            ]
        ],
        elementPathEnabled: false,
        autoHeightEnabled: false,
        initialFrameWidth: 450,    //编辑器宽度
        zIndex: 9999999,
        initialFrameHeight: 320,   //编辑器高度
        wordCount: true,          //是否开启字数统计
        maximumWords: 2000,       //允许的最大字符数
        //字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数,留空支持多语言自动切换，否则按此配置显示
        wordCountMsg: '当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符',   //当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符
        //超出字数限制提示  留空支持多语言自动切换，否则按此配置显示
        wordOverFlowMsg: '<span style="color:red;">你输入的字符个数已经超出最大允许值!请重新编辑</span>'    //<span style="color:red;">你输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！</span>
    });
     //富文本框内容变化监听
    ue.addListener('contentChange', function () {
        editorContent();
    })
})



/**
 * 时间输入框 执行一个laydate实例
 * 宣文彬
 * 2018-9-28
 */
laydate.render({
    elem: '#search-input-announcetime' //指定元素
});

/**
 * 模糊搜索 begin
 * 宣文彬
 * 2018-9-28
 */
$(function(){
    $("#search-submit").on("click", function () {
        let settings = {
            url: AJAX_URL.announceManagementData,
            method: requestJson ? 'get' : 'post',
            dataType: "json",
            data:{
                "accounceTitle": $("#search-input-announcetitle").val(),//获得公告关键词
                "announceCategory":$("#search-input-announcetyp").val(),//获得公告类型
                "announceTime":$("#search-input-announcetime").val(),//发布时间
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
 * 2018-9-28
 */
$("#delete-button-accounce").on("click", function () {
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
    }
    else {
        poptip.confirm({
            content: POP_TIP.confirm,
            yes : function(){
                let settings = {
                    url: AJAX_URL.announceManagementData,
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
 * 查看当前数据，显示详情模态框
 * 宣文彬
 * 2018-9-27
 */
function openDetialModal() {
    //模态框标题
    $("#accounce-modaltitle").html('<h4>' + ' 公告详情' + '</h4>')
    //得到当前数据的详细信息

}
function openUpdateModal(){
    //模态框标题
    $("#model-title").html('<h4>' + ' 公告编辑' + '</h4>')
}
/**
 * 重置按钮,搜索项变为空
 * 宣文彬
 * 2018-9-27
 *
 */
$("#reset-button").on("click",function () {
    $("#search-input-announcetitle").val("");
    $("#search-input-announcetime").val("");
    $("#search-select-announcetype").find("option:first").prop("selected", 'selected');;
})

//打开文件选择框
function selectFile(){
    $("#add-input-file").trigger("click");
}

/**
 * 模态框判空提示语
 * ------开始--------
 */

function hideTip(that) {
    //主题
    if($(that).val()==null || $(that).val()==""){
        $(that).parent().next().show();
    }else{
        $(that).parent().next().hide();
    }
}

function saveSubmit() {
    //主题
    if($("#add-input-theme").val()==""){
        $("#add-input-theme").parent().next().show();
    }else{
        $("#add-input-theme").parent().next().hide();
    }
    //分类
    if($("#add-select-category").val()==null){
        $("#add-select-category").parent().next().show();
    }else{
        $("#add-select-category").parent().next().hide();
    }
    //编辑器内容
    editorContent();
}

//编辑器内容判空
function editorContent(){
    if (ue.getContentTxt().length === 0) {
        $("#add-script-editor").parent().next().show();
    }
    else {
        $("#add-script-editor").parent().next().hide();
    }
}

//当模态框完全对用户隐藏时触发隐藏提示语
$('#add-accouncemodal').on('hidden.bs.modal', function () {
    // 执行提示语
    $(".judge-tip").css("display","none");
})

//-----------结束--------------