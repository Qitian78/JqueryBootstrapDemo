/**
 * @Desc 人员库页面
 * @Date 2018-09-17 15:07:38
 * @Author wagnkelong
 */

//标签页动态效果
$(document).ready(function() {
    let $wrapper = $('.tab-wrapper'),
        $allTabs = $wrapper.find('.tab-content > div'),
        $tabMenu = $wrapper.find('.tab-menu li'),
        $lines = $('<div class="lines"></div>').appendTo($tabMenu);
    $allTabs.not(':first-of-type').hide();
    $tabMenu.filter(':first-of-type').find(':first').width('100%')
    $tabMenu.each(function(i) {
        $(this).attr('data-tab', 'tab'+i);
    })
    $allTabs.each(function(i) {
        $(this).attr('data-tab', 'tab'+i);
    });
    $tabMenu.on('click', function() {
        let dataTab = $(this).data('tab'),
            $getWrapper = $(this).closest($wrapper);
        $getWrapper.find($tabMenu).removeClass('active');
        $(this).addClass('active');
        $getWrapper.find('.lines').width(0);
        $(this).find($lines).animate({'width':'100%'}, 'fast');
        $getWrapper.find($allTabs).hide();
        $getWrapper.find($allTabs).filter('[data-tab='+dataTab+']').show();
    });

});//end ready

/**
 * @Desc 获得页面数据
 * @Date 2018-09-17 15:08:07
 * @Author wangkelong
 */
$(function(){
    $.ajax({
        url: AJAX_URL.personDataTab,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            //获得标签页的标题
            let $str;
            let title0 = data.Actor1[0].title
            $str = title0
            $("#actorTabA").eq(0).append($str)
            let title1 = data.Actor2[0].title
            $str = title1
            $("#actorTabB").eq(0).append($str)
            let title2 = data.Actor3[0].title
            $str = title2
            $("#actorTabC").eq(0).append($str)

            /*$.each(data, function (index, item) {
                let tabData = data[index]
                let TabEach = "tab"+index
                $.each(tabData, function (inde, item) {
                    let title = tabData[inde].title
                    $str = '<li class="active" id="tabActor1">' + title + '</li>'
                    $("#actors").eq(0).append($str)
                })
            })*/
            ////获得标签页的内容
            $.each(data, function (index, item) {
                //循环获取数据
                let actorData = data[index]
                let contEach = "act"+index;
                console.log(contEach)
                $.each(actorData, function (inde, item) {
                    let name = actorData[inde].name
                    let nation = actorData[inde].nation
                    let school = actorData[inde].school
                    let film = actorData[inde].film
                    let award = actorData[inde].award
                    let intro = actorData[inde].intro
                    $str ='<ul><li>' + '姓名：' + name + '</li>' +
                        '<li>' + '籍贯：' + nation + '</li>' +
                        '<li>' + '毕业院校：'  + school + '</li>' +
                        '<li>' + '参演电影：'  + film + '</li>' +
                        '<li>' + '获得奖项：'  + award + '</li>' +
                        '<li>' + '个人简介：'  + intro + '</li></ul>' +
                        '<ul><li>' + '姓名：' + name + '</li>' +
                        '<li>' + '籍贯：' + nation + '</li>' +
                        '<li>' + '毕业院校：'  + school + '</li>' +
                        '<li>' + '参演电影：'  + film + '</li>' +
                        '<li>' + '获得奖项：'  + award + '</li>' +
                        '<li>' + '个人简介：'  + intro + '</li></ul>' +
                        '<ul><li>' + '姓名：' + name + '</li>' +
                        '<li>' + '籍贯：' + nation + '</li>' +
                        '<li>' + '毕业院校：'  + school + '</li>' +
                        '<li>' + '参演电影：'  + film + '</li>' +
                        '<li>' + '获得奖项：'  + award + '</li>' +
                        '<li>' + '个人简介：'  + intro + '</li></ul>'
                    $("#"+contEach).eq(0).append($str)
                })
            });
        }
    })
})

/**
 * @Desc 获得页面数据
 * @Date 2018-09-17 15:08:07
 * @Author wangkelong
 */

$(function(){
    $.ajax({
        url: AJAX_URL.personProblem,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            ////获得问题列表的内容
            $.each(data, function (index, item) {
                //循环获取数据
                let proData = data[index]
                let proEach = "problem"+index;
                console.log(proEach)
                $.each(proData, function (inde, item) {
                    let $str ='<ul>' +
                        '<li>' + '问题：' + proData[inde].pro1 + '</li>' +
                        '<li>' + '问题：' + proData[inde].pro2 + '</li>' +
                        '<li>' + '问题：' + proData[inde].pro3 + '</li>' +
                        '<li>' + '问题：' + proData[inde].pro4 + '</li>' +
                        '<li>' + '问题：' + proData[inde].pro5 + '</li>' +
                        '<li>' + '问题：' + proData[inde].pro6 + '</li>' +
                        '</ul>'
                    $("#"+proEach).eq(0).append($str)
                })
            });
        }
    })
})


