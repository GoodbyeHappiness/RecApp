/**
 * Created by 10136 on 2016/10/21.
 */
$(function () {
    $('.upload-view').click(function () {
        $('.input-file').click();
    });
    //阻止浏览器默认行。
    $(document).on({
        dragleave:function(e){    //拖离
            e.preventDefault();
        },
        drop:function(e){  //拖后放
            e.preventDefault();
        },
        dragenter:function(e){    //拖进
            e.preventDefault();
        },
        dragover:function(e){    //拖来拖去
            e.preventDefault();
        }
    });
    var ele = $('.resume-block');
    ele[0].addEventListener('drop',function (e) {
        e.preventDefault();
        var fileList = e.dataTransfer.files; //获取文件对象
        //检测是否是拖拽文件到页面的操作
        if(fileList.length == 0){
            return false;
        }
        console.log(fileList[0]);
    });
});