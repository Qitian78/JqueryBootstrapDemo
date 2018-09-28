/*
 * @Description:知识详情
 * @Date 2018/9/25 16:54
 * @author Wang ke long
*/

$(function(){
    $.ajax({
        url: AJAX_URL.knowledgeDetial,
        type: requestJson?'get':"post",
        dataType: "json",
        success: function(data) {
            ////获得知识详情的内容
            if(data){
                //$('.detial-content').empty();
                for(let key in data){
                    //获取知识点标题
                    $("#titleText").append(key)
                    let contentData = data[key]
                    $.each(contentData, function (inde, item) {
                        //获取知识点内容
                        let content = contentData[inde].content
                        $("#contextText").append(content)
                    })
                }
            }
        }
    })
})