'use strict';
$(function(){
    let activeLi = sessionStorage.getItem('nav-page');
    if(activeLi){
        let activeList = activeLi.split('-');
        if(activeList.length > 1){
            setTimeout(function(){
                let $li = $('.nav-tabs').find('li[name="'+activeList[0]+'"]').find('.dropdown-submenu').find('li[name="'+activeList[1]+'"]');
                //$li.trigger('click',this,'../'+activeList[0]+'/'+activeList[1],activeLi);
                console.log($li.attr('onclick'))
                eval($li.attr('onclick'));
            })
        }else{
            setTimeout(function() {
                let $li = $('.nav-tabs').find('li[name="'+activeList[0]+'"]');
                eval($li.attr('onclick'));
                //$('.nav-tabs').find('li[name="'+activeList[0]+'"]').trigger('click',this,'../');
            });

        }
    }else{
        $('.nav-tabs').find('li[name="index"]').trigger('click');
    }
})