/**
 * @Desc 多文件上传
 * @Date 2018-09-19 13:31:53
 * @Author qitian
 */
/*var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target) {
    var fileSize = 0;
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile (filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    if(size>2000){
        alert("附件不能大于2M");
        target.value="";
        return
    }
    var name=target.value;
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    if(fileName !="xls" && fileName !="xlsx"){
        alert("请选择execl格式文件上传！");
        target.value="";
        return
    }
}

function filefujianChange(target) {
    var fileSize = 0;
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile (filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    if(size>2000){
        alert("附件不能大于2M");
        target.value="";
        return
    }
    var name=target.value;
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    if(fileName !="jpg" && fileName !="jpeg" && fileName !="pdf" && fileName !="png" && fileName !="dwg" && fileName !="gif" ){
        alert("请选择图片格式文件上传(jpg,png,gif,dwg,pdf,gif等)！");
        target.value="";
        return
    }
}*/
/*$("#file-0").fileinput({
    uploadUrl: '#',
    allowedFileExtensions : ['jpg', 'png','gif'],
    overwriteInitial: false,
    maxFileSize: 1000,
    maxFilesNum: 10,
    allowedFileTypes: ['image', 'video', 'flash'],
    slugCallback: function(filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
});*/
