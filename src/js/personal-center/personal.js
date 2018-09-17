/**
 * @Desc 个人信息页面
 * @Date 2018-09-17 00:52:23
 * @Author qitian
 */

$(function(){
    laydate.render({
        elem: '#birthday',
        type: 'month',
        max: new Date().Format('yyyy-MM'),
        done: function (value) {

        }
    });
});

/**
 * @Desc 保存按钮出发事件
 * @Param modalId模态框id,checkFormItem
 * @Date 2018-09-17 00:47:31
 * @Author qitian
 */

function saveInfo(modalId,checkFormItem){
    if(checkFormItem){
        if(checkFormItems(modalId)){
            console.log('保存请求');
        }else{
            return false;
        }
    }else{
        console.log('保存请求');
    }
}
