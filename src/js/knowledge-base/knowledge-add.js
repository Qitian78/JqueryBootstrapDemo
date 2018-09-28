let ue;
$(function () {
//初始化Ueditor富文本编辑器
    ue = UE.getEditor('container', {
        toolbars: [
            [
                'bold',
                'italic',
                'underline',
                '|',

                'insertorderedlist',
                'insertunorderedlist',
                'fontsize',

                '|',
                'justifyleft',
                'justifycenter',
                'justifyright',
                'justifyjustify',
            ]
        ],
        elementPathEnabled: false,
        autoHeightEnabled: false,
        initialFrameWidth: 450,
        zIndex: 9999999,
        initialFrameHeight: 320,
        wordCount: true,          //是否开启字数统计
        maximumWords: 2000,       //允许的最大字符数
        //字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数,留空支持多语言自动切换，否则按此配置显示
        wordCountMsg: '当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符',   //当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符
        //超出字数限制提示  留空支持多语言自动切换，否则按此配置显示
        wordOverFlowMsg: '<span style="color:red;">你输入的字符个数已经超出最大允许值!请重新编辑</span>'    //<span style="color:red;">你输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！</span>
    });
    ue.addListener('contentChange', function () {
        if (ue.getContentTxt().length === 0) {
            content.showObj.contentShow = true;
        }
        else {
            content.showObj.contentShow = false;
        }
        content.staffRecord.content = ue.getContent()
    })
})