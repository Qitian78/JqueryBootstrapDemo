/*
 * @Description:首页内容
 * @Date 2018/9/28 10:10
 * @author Wang ke long
*/

/*
 * @Description:获取待办事项数据
 * @Date 2018/9/28 10:10
 * @author Wang ke long
*/
$(function(){
    $.ajax({
        url: AJAX_URL.IndexEvent,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            ////获得问题列表的内容
            if (data && data.ok === true) {
                    console.log(data)
                    $.each(data, function (index, item) {
                        //循环获取数据
                        let myData = data[index]
                        console.log(myData)
                        if(myData instanceof Array){
                            $.each(myData,function (inde,ite) {
                                let $str =
                                    '<li class="event-li"><span class="event-li-span glyphicon glyphicon-question-sign"></span><a class="event-a">' + myData[inde].evn + '</a><a class="event-badge badge">' + myData[inde].num + '</a></li><hr>'
                                $("#event-wait-list").append($str)
                            })
                        }
                    });
            }else {
                poptip.alert("请求失败");
                console.log("请求失败")
            }
            /*if(data){
                console.log(data)
                $.each(data, function (index, item) {
                    //循环获取数据
                    let myData = data[index]
                    console.log(myData)
                    $.each(myData,function (inde,ite) {
                        let $str =
                        '<li class="event-li"><span class="event-li-span glyphicon glyphicon-question-sign"></span><a class="event-a">' + myData[inde].evn + '</a><a class="event-badge badge">' + myData[inde].num + '</a></li><hr>'
                        $("#event-wait-list").append($str)
                    })
                });
            }*/
        }
    })
})
/*
 * @Description:获得数据发布数据
 * @Date 2018/9/28 11:26
 * @author Wang ke long
*/
//获得表格数据
$(function(){
    $.ajax({
        url: AJAX_URL.IndexData,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            ////获得数据发布列表的内容
            if(data &&data.ok === true){
                console.log(data)
                $.each(data, function (index, item) {
                    //循环获取数据
                    let myData = data[index]
                    console.log(myData)
                    if(myData instanceof Array){
                    $.each(myData,function (ind,ite) {
                        let $str = '<table class="data-table-publish table">' +
                            '<tr class="data-tr-publish">' +
                            '<td>'+'<a class="data-a-publish">'+myData[ind].carInfo+'</a>'+'</td>' +
                            '<td>'+'<a class="data-a-publish">'+myData[ind].depart+'</a>'+'</td>' +
                            '<td>'+'<a class="data-a-publish">'+myData[ind].name+'</a>'+'</td>' +
                            '<td>'+'<a class="data-a-publish">'+myData[ind].date+'</a>'+'</td>' +
                            '</tr>' +
                            '</table>'
                        $("#data-table").append($str)
                    })
                    }
                });
            }else {
                poptip.alert("请求失败");
            }

        }
    })
})
/*
 * @Description:获取备件查询数据
 * @Date 2018/9/28 12:43
 * @author Wang ke long
*/
$(function(){
    $.ajax({
        url: AJAX_URL.IndexSpare,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            //获得备件查询列表的内容
            if(data && data.ok === true){
                console.log(data)
                $.each(data, function (index, item) {
                    //循环获取数据
                    let myData = data[index]
                    console.log(myData)
                    if(myData instanceof Array){
                    $.each(myData,function (inde,ite) {//遍历图片和名称
                        let $str = '<li  class="spare-li"><img class="spare-images" src= '+myData[inde].picture+' ><span class="spare-span">' + myData[inde].name + '</span></li>'
                        $("#spare-content").append($str)
                    })
                    }
                });
            }else {
                poptip.alert("请求失败");
            }
        }
    })
})

/*
 * @Description:首页标签页动态效果
 * @Date 2018/9/28 10:14
 * @author Wang ke long
*/
$(document).ready(function() {
    var $wrapper = $('.tab-wrapper'),
        $allTabs = $wrapper.find('.tab-content > div'),
        $tabMenu = $wrapper.find('.tab-menu li'),
        $line = $('<div class="line"></div>').appendTo($tabMenu);
    $allTabs.not(':first-of-type').hide();
    $tabMenu.filter(':first-of-type').find(':first').width('100%')
    $tabMenu.each(function(i) {
        $(this).attr('data-tab', 'tab'+i);
    });
    $allTabs.each(function(i) {
        $(this).attr('data-tab', 'tab'+i);
    });
    $tabMenu.on('click', function() {
        var dataTab = $(this).data('tab'),
            $getWrapper = $(this).closest($wrapper);
        $getWrapper.find($tabMenu).removeClass('active');
        $(this).addClass('active');
        $getWrapper.find('.line').width(0);
        $(this).find($line).animate({'width':'100%'}, 'fast');
        $getWrapper.find($allTabs).hide();
        $getWrapper.find($allTabs).filter('[data-tab='+dataTab+']').show();
    });
});//end ready