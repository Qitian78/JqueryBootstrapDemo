'use strict';

/**
 * @Desc 左侧导航栏-》二级菜单点击事件
 * @Date 2018-09-16 20:06:49
 * @Author qitian
 */
$(function(){
    $('.dropdown').on('click',function(){
        if($(this).next('.dropdown-submenu').css('display') === 'none'){
            $(this).next('.dropdown-submenu').css('display','block');
        }else{
            $(this).next('.dropdown-submenu').css('display','none');
        }
    });
    $('.sider-nav').find('li').each(function (index,item) {
        let go = $(item).attr('go');
        let name = $(item).attr('name');
        if(go && name){
            $(item).bind('click',function(){loadPage(name);})
        }
    })
})

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
                $('.sidebar-nav').find('li[name="'+activeList[0]+'"]').find('.dropdown-submenu').css('display','block');
            }
            setTimeout(function() {
                $('.sidebar-nav').find('li[name="'+activeLi+'"]').addClass('active');
            });
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
    let $li = $('.sidebar-nav').find('li[name="'+liName+'"]').addClass('active');
    let page = $li.attr('go');
    $('.content-center')[0].innerHTML = '<iframe type="text/html" id="'+liName+'" src="'+page+'" width="100%" height="100%"></iframe>';
    sessionStorage.setItem('nav-page',liName);
};