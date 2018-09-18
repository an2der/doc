var totalRows = 10;
var currPage = 1;

function loadData(pageindex) {

    $("#tblist-body").children().remove();
    /*
        var name = $("#docname").val();
        var owner = $("#owner").val();
        var data = 'phoibe/document/list/'+pageindex+'/10?1=1';

        if (name!=null);
        data = data + "&name=" + name;
        if (owner != "") {
            data = data + "&userRealName=" + owner;
        }
        var wartypevalue = $("#wartype option:selected").val();
        if (wartypevalue != 0) {
            data = data + "&combatType=" + wartypevalue;
        }
        var armtypevalue = $("#armtype option:selected").val();
        if (armtypevalue != 0) {
            data = data + "&arms=" + armtypevalue;
        }
        var chkValue = $("#con-value li[checked='checked']");
        var doctypevalue = chkValue.html();

        if (doctypevalue != "undefined" && doctypevalue != null) {
            data = data + "&format=" + doctypevalue.toLowerCase();
        }*/

    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            var step = 0;
            var row = "";
            $.each(result.data.dataList, function (i, val) {

                var id = val["id"];;
                var name =  val["name"];//"标签名称";
                var createtime =  val["createtime"];//"创建时间";
                var hitnum =  val["hitnum"];//"点击量";


                var row = "<tr><td class='chksel'><input type='radio' name='chksel' data-value='" + id + "'/></td><td>"
                    + name + "</td><td>" + createtime + "</td><td>"
                    + hitnum + "</td></tr>";
                $("#tblist-body").append(row);
            });
        }
    });


    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        laypage.render({
            elem: 'notice_pages'
            , count: totalRows
            , curr: currPage//当前页,
            , first: '首页'
            , last: '尾页'
            , prev: '<em>←</em>'
            , next: '<em>→</em>'
            , jump: function (obj, first) { //触发分页后的回调
                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                    currPage = obj.curr;
                    loadData(obj.curr);
                }
            }
        });
    });


}

$(function () {
    $("#btnadd").click(function () {
        $(".bodyMask").fadeIn();
    });
    $("#btnmodify").click(function () {
        $(".model-title").html("修改标签");
        $(".bodyMask").fadeIn();
    });
    $(".closed").click(function () {
        $(".bodyMask").hide();
    });

    loadData(0);
    $("#btnSearch").click(function () {
        loadData(0);
        parent.iframeLoad();
    });

    $('#submit').click(function () {

        var form = $("#ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
        alert(GAL_URL + form.attr("action"));
        $.ajax({
            url: GAL_URL + form.attr("action"),
            type: form.attr("method"),
            data: JSON.stringify(formdata),
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.success) {
                    alert("提交成功");
                }
            }
        });
    })
});