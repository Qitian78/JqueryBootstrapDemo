
'use strict';
/**
 * @Desc 左侧导航栏-》一级菜单点击事件
 * @Date 2018-09-16 20:07:16
 * @Author qitian
 */

/*$('.nav-tabs li').on('click',function(event){
    $('.nav-tabs').find('li').each(function(index,item){
        $(item).removeClass('active');
    })
    $(this).addClass('active');
    event.stopPropagation();
});*/
/**
 * @Desc 左侧导航栏-》二级菜单点击事件
 * @Date 2018-09-16 20:06:49
 * @Author qitian
 */
$('.dropdown').on('click',function(){
    if($(this).next('.dropdown-submenu').css('display') === 'none'){
        $(this).next('.dropdown-submenu').css('display','block');
    }else{
        $(this).next('.dropdown-submenu').css('display','none');
    }
});

/**
 * @Desc 左侧导航伸缩事件
 * @Param Windows事件
 * @Date 2018-09-16 20:07:42
 * @Author qitian
 */
function expendSider(event){
    let siderWidth = $('.mody-sider').css('width');
    if(siderWidth !== '38px'){//收缩
        $('.mody-sider').css('width','38px');
        $('.hidden-tablet').each(function(index,item){
            $(item).removeClass('tablet-expend');
            $(item).addClass('tablet-shirnk');
        })
        $('.content-center').css('width','calc(100% - 38px)');
        $('.content-center').css('left','38px');
        $('.fa-bars').css('transform','rotate(90deg)');
        $('.dropdown-submenu').each(function (index,item) {
            $(item).css('display','none');
        })
    }else{//展开
        $('.mody-sider').css('width','15%');
        $('.hidden-tablet').each(function(index,item){
            $(item).removeClass('tablet-shirnk');
            $(item).addClass('tablet-expend');
        })
        $('.content-center').css('width','85%');
        $('.content-center').css('left','15%');
        $('.fa-bars').css('transform','rotate(360deg)');
        let activeLi = sessionStorage.getItem('nav-page');
        if(activeLi){
            let activeList = activeLi.split('-');
            if(activeList.length > 1){
                $('.nav-tabs').find('li[name="'+activeList[0]+'"]').find('.dropdown-submenu').css('display','block');
                setTimeout(function(){
                    $('.nav-tabs').find('li[name="'+activeList[0]+'"]').find('.dropdown-submenu').find('li[name="'+activeList[1]+'"]').addClass('active');
                })
            }else{
                setTimeout(function() {
                    $('.nav-tabs').find('li[name="'+activeList[0]+'"]').addClass('active');
                });

            }
        }
    }

}

/**
 * @Desc 左侧导航，页面跳转
 * @Date 2018-09-16 20:08:21
 * @Author qitian
 */
function loadPage(liName) {
    $('.nav-tabs').find('li').each(function(index,item){
        $(item).removeClass('active');
    })
    let $li;
    let activeList = liName.split('-');
    if(activeList.length > 1){
        $li = $('.nav-tabs').find('li[name="'+activeList[0]+'"]').find('.dropdown-submenu').find('li[name="'+activeList[1]+'"]');
        $li.addClass('active');
    }else{
        $li = $('.nav-tabs').find('li[name="'+activeList[0]+'"]').addClass('active');
        $li.addClass('active');
    }
    let page = $li.attr('go');
    $('.content-center')[0].innerHTML = '<object type="text/html" id="'+liName+'" data="'+page+'" width="100%" height="100%"></object>';
    sessionStorage.setItem('nav-page',liName);
};