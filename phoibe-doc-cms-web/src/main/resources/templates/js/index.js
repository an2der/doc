
function bindZhanfa() {
    $("#zgzhanfa").children().remove();
    var userStr = getCookie("userObject");
    var userId =1;
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
    }
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/user/0/4?userId='+userId,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            var step = 0;
            var row = "";
            $.each(result.data, function (i, val) {
                var title = val["name"];
                var pagecount = val["pagecount"];
                var status = val["status"];
                var tid = val["id"];
                var docstatus = "";
                if (status == 0) {
                    docstatus = "上传中";
                }
                else{
                    docstatus = "上传完成";
                }

                var row = "<li class='per-50'><i class='i-star'></i><a title='" + title + "' href='docdetail.html?tid=" + tid + "'>" + cutString(title, 20) + "</a></li><li class='per-10'>" + pagecount + "</li><li class='per-30'>" + docstatus + "</li>";
                $("#zgzhanfa").append(row);

            });
        }
    });
}
function bindResouDoc() {//<div class='font22 title'>中国战法</div>
    $("#zgzhanfa").children().remove();
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/0/19?f=hot',

        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            var step = 0;
            var row = "";
            $.each(result.data.dataList, function (i, val) {
                var title = val["name"];
                var format = val["format"];
                var tid = val["id"];
                step = step + 1;

                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else {
                    icon = "<i class='exls'></i>";
                }

                row = row + "<li>" + icon + "<a href='docdetail.html?tid=" + tid + "' title="+title+">" + cutString(title, 22) + "</a></li>";
                if (step == total_rows) {
                    var trow = "<div class='col3  clearfix'><div class='ul-header'><div class='ul-img fl'><img src='images/index-head.png'/></div><div class='ul-header-right fl'><div class='ul-header-name'>李明</div><span class='ul-header-docnum'>10689</span>篇文档</div></div><ul class='list1'>" + row + "</ul></div>";
                    $("#resou-doc").append(trow)
                    return;
                }
                if (step % 3 == 0) {
                    var trow = "<div class='col3  clearfix'><div class='ul-header'><div class='ul-img fl'><img src='images/index-head.png'/></div><div class='ul-header-right fl'><div class='ul-header-name'>李明&nbsp;&nbsp;<span class='ul-header-docnum'>10689</span>篇文档&nbsp;</div>"
                                      //+"<div class='scoreremark'><span class='ul-header-docnum'>10689</span>篇文档&nbsp;评分：<ul><li class='light'><a href='javascript:;'>1</a></li>"
                                      /*+"<div class='scoreremark'>评分：<ul class='fr'><li class='light'><a href='javascript:;'>1</a></li>"  
									  +"<li class='light'><a href='javascript:;'>2</a></li>"
                                      +"<li class='light'><a href='javascript:;'>3</a></li>"
                                      +"<li class='light'><a href='javascript:;'>4</a></li>"
                                      +"<li class='light'><a href='javascript:;'>5</a></li>"
                                     +"</ul></div></div></div><ul class='list1'>" + row + "</ul></div>";*/
									 +"<div class='scoreremark'>评分:<i class='i-star'></i><i class='i-star'></i><i class='i-star'></i><i class='i-star'></i><i class='i-star'></i>"
									 +"</div></div></div><ul class='list1'>" + row + "</ul></div>";
					//alert(trow);
                    $("#resou-doc").append(trow)
                    row = "";
                }

            });
        }
    });
}

function bindRecommDoc() {
    $("#zgzhanfa").children().remove();
    var url = GAL_URL + 'phoibe/document/list/0/19?f=handpick';
    //alert(url);
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/0/19?f=handpick',

        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            var step = 0;
            var row = "";
            $.each(result.data.dataList, function (i, val) {
                var title = val["name"];
                var format = val["format"];
                var tid = val["id"];
                step = step + 1;

                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else {
                    icon = "<i class='exls'></i>";
                }
                row = row + "<li>" + icon + "<a href='docdetail.html?tid=" + tid + "' tile="+title+">" +cutString(title,22) + "</a></li>";
                if (step == total_rows) {
                    var trow = "<div class='col3'><ul class='list1'>" + row + "</ul></div>";;
                    $("#recom-doc").append(trow)
                    return;
                }
                if (step % 3 == 0) {
                    var trow = "<div class='col3'><ul class='list1'>" + row + "</ul></div>";;
                    $("#recom-doc").append(trow)
                    row = "";
                }

            });
        }
    });
}
function bindDym() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/user/0/10',
        //url: 'http://199.139.199.154:8090/phoibe/document/selectDoucumentList',
        dataType: 'json',
        success: function (result) {
            $.each(result.data, function (i, val) {
                var docname = val["name"];
                var createTime = val["createTime"];
                var tid = val["id"];
                var d = new Date();
                var curTime = d.getTime();
                var username = val["userRealName"];
                var i = 1;

                var date3 = curTime - Date.parse(createTime);  //时间差的毫秒数

                //计算出相差天数
                var days = Math.floor(date3 / (24 * 3600 * 1000));
                var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000));

                var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000))
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000))
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000)
                var minutesTip = "";
                if (seconds > 0) minutesTip = seconds + " 秒前上传";
                if (minutes > 0) minutesTip = minutes + "分钟" + minutesTip;
                if (hours > 0) minutesTip = hours + "小时" + minutesTip;
                if (days > 0) minutesTip = days + "天" + minutesTip;

                var row = "<ul class='list3'><li><a href='docdetail.html?tid=" + tid + "' title='" + docname + "'>" + cutString(docname, 28) + "</a></li><li><span>" + username + "</span></li><li>" + minutesTip + "</li></ul>";
                $("#lst-dym").append(row);
            });
        }
    });
}
function getDocNum() {

    var userStr = getCookie("userObject");
    var userId =1;
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
    }
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/count?userId='+userId,
        dataType: 'json',
        success: function (result) {
            if (result.code == "SUCCESS");
            //alert(result.data);
            $("#docnum").html(result.data);
        }
    });
}

$(function () {
    getDocNum();
    bindRecommDoc();
    bindDym();
    bindZhanfa();
    bindResouDoc();
    $("#upload").click(function () {
        $(window.parent.document).find(".bodyMask").fadeIn();
    });

    $("#condif").click(function () {
        $("#condwhere").fadeIn();
    });
    $(".closed").click(function () {
        $("#condwhere").fadeOut();
    });

   
    $("#btnSearch").click(function () {

        var url = 'search.html?s=1';
        var data="";

        var searchKey = $("#search-key").val();
        if (searchKey!=""&&searchKey!=null){
            data =  data+ "&search-key=" + searchKey;
        }
        var docname = $("#docname").val();
        if (docname!=""&&docname!=null){
            data = data + "&docname=" + docname;
        }
        var owner = $("#owner").val();
        if (owner != "") {
            data = data + "&owner=" + owner;
        }
        var warstate = $("#warstate").val();
        if (warstate != "") {
            data = data + "&warstate=" + warstate;
        }
        var waraddr = $("#waraddr").val();
        if (waraddr != "") {
            data = data + "&waraddr=" + waraddr;
        }
        var wartime = $("#wartime").val();
        if (null!=wartime&&wartime != "") {
            data = data + "&wartime=" + wartime;
        }
        var winner = $("#winner").val();
        if (winner != "") {
            data = data + "&winner=" + winner;
        }
        var loser = $("#loser").val();
        if (loser != "") {
            data = data + "&loser=" + loser;
        }
        var warnum = $("#warnum").val();
        if (warnum != "") {
            data = data + "&warnum=" + warnum;
        }
        var wartypevalue = $("#wartype option:selected").val();
        if (wartypevalue != 0) {
            data = data + "&wartype=" + wartypevalue;
        }
        var armtypevalue = $("#armtype option:selected").val();
        if (armtypevalue != 0) {
            data = data + "&armtype=" + armtypevalue;
        }
        var doctypevalue = "";
        $("#con-value .check").each(function () {
            if (doctypevalue==""){
                doctypevalue = $(this).html();
            }else {
                doctypevalue = doctypevalue +","+$(this).html();
            }
        })
        if (doctypevalue != "" && doctypevalue != null) {
            data = data + "&format=" + doctypevalue;
        }
        data = GAL_URL + url+ data;
        window.location.href = encodeURI(data);
    });
});