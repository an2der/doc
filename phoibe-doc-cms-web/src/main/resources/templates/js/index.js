function appendDitHtml(){
    var dataDict = parent.dataDictLoadAjax();

    // {
    // "SOLDIERS":[{"dictKey":"PB","dictName":"炮兵"},[{"dictKey":"TXB","dictName":"通讯兵"}],[{"dictKey":"ZJB","dictName":"装甲兵"}],[{"dictKey":"BB","dictName":"步兵"}]],
    // "COMBAT":[{"dictKey":"BZ","dictName":"兵种战例"},[{"dictKey":"XF","dictName":"西方战例"}],[{"dictKey":"EJ","dictName":"俄军战例"}],[{"dictKey":"SJ","dictName":"苏军战例"}]]}
    // <option value="4 ">兵种战例</option>
    var wartype = "";
    var armtype = "";
    $.each(dataDict.COMBAT,function (i,val) {
        wartype +="<li class='tag-li' dictKey="+val["id"]+">"+val["dictName"]+"</li>";
    })
    $.each(dataDict.SOLDIERS,function (i,val) {
        armtype +="<li class='tag-li' dictKey="+val["id"]+">"+val["dictName"]+"</li>";
    })
    $(".wartype").html(wartype);
    $(".armtype").html(armtype);
    $(".wartype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
    $(".armtype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
    var dataDict = parent.dataDictSelectHtml();
    for (var obj in dataDict){
        var fieldObj = parent.selectfield(obj);
        var fieldfn = fieldObj.fn;
        if(""!=fieldfn){
            $("#"+fieldfn).html(dataDict[obj]);
        }
    }/**/
}
function appendTagHtml() {
    var dataList = parent.tagLoadAjax(10000);
    var rowhtml = "";
    $.each(dataList, function (i, val) {
        var id = val["id"];
        var name = val["name"];//"标签名称";
        rowhtml +="<li class='tag-li' dictkey='"+id+"'>"+name+"</li>";
    });
    $(".tagtype").html(rowhtml);

    $(".tagtype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
}
function appendHotSearchHtml(){
    var resultData = parent.hotsearchLoadAjax();
    var rowhtml = "<li class=''>热门：";
    $.each(resultData, function (i, val) {
        rowhtml +="<a class='line-li' href='#'>" + cutString(val, 14) + "</a>";
    });
    rowhtml=rowhtml+"</li>";
    $("#hotSerach").html(rowhtml);

    $("#hotSerach a").click(function () {
        var hotChar = $(this).text();
        $("#search-key").val(hotChar);
       $("#btnSearch").click();
    })
    $("#serachType a").click(function () {
        $(this).addClass("acheck");
        $("#btnSearch").click();
    })

}
function appendUserSearchHtml(){
    var resultData = parent.usersearchLoadAjax();
    var rowhtml = "";
    $.each(resultData, function (i, val) {
        rowhtml +="<option value='"  + val + "' />";
    });
    $("#userSearchList").html(rowhtml);
}


function bindRecommDoc() {
    $("#zgzhanfa").children().remove();
    var url = GAL_URL + 'phoibe/document/list/0/16?f=handpick&isstock=2';
    //alert(url);
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (result) {
            $.each(result.data.dataList, function (i, val) {
                var format = val["format"];
                var docname = val["name"];
                var createTime = val["stockTime"];
                var tid = val["id"];
                var description=val["description"];
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                    "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,24)+
                    "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime.substring("5","10")+"</span></h5></div>"+
                    "<div class='right-item-desc'>"+cutString(description,76)+"</div>"+
                    "</a></li>";
                $("#lst-rm").append(row);

            });
        }
    });
}
function bindDym() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/0/20?f=storage&isstock=2',
        //url: 'http://199.139.199.154:8090/phoibe/document/selectDoucumentList',
        dataType: 'json',
        success: function (result) {
            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var createTime = val["stockTime"];
                var tid = val["id"];
                var description=val["description"];
                if (""==description||null==description){
                    description="当前没有摘要内容，请查看附件...";
                }
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                    "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,24)+
                    "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime.substring("5","10")+"</span></h5></div>"+
                    "<div class='right-item-desc'>"+cutString(description,76)+"</div>"+
                    "</a></li>";
                $("#lst-dym").append(row);
                //alert(row);
            });
        }
    });
}
function getUserDocNum() {

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
            var url_tag = GAL_URL+"percenter.html";
            var url_tag = GAL_URL+"percenter.html";
            $("#userdocnum").attr("href",url_tag);
            $("#userdocnum").html(result.data);
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
     //SOLDIERS3223423
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/statistical/COMBAT',
        dataType: 'json',
        success: function (result) {

            if (result.code == "SUCCESS"){
                $.each(result.data,function (i,val) {
                    if (i<6){
                    var name = val.name;
                    var count = val.count;
                    var wartype=val.id;
                        var hrefUrl= "searchadv.html?combatArray="+wartype;
                        var countStr=""+count;
                        if (count>10000){
                            countStr = parseInt(count/10000) + "+&nbsp;万";
                        }
                    var row="<li><span>"+name+"：<a href='"+hrefUrl+"'target='_self'>"+countStr+"</a></span></li>";

                    $(".dw-bk ul").append(row);
                    }
                })
            }

        }
    });
}

function editDocFun(docId){
    $("#upload").click();
    parent.getDocObjecLoad(docId);
}
$(function () {
    getUserDocNum();
    getDocNum();
    bindRecommDoc();
    bindDym();
    appendDitHtml();
    appendTagHtml();
    appendUserSearchHtml();
    appendHotSearchHtml();
    $("#upload").click(function () {
        parent.docDetailRecoverController();
        var itemlength = $(window.parent.document).find("#thelist").find(".item").length;
        if (itemlength>0){
            alert("有未上传完成的任务，请先上传");
            $(window.parent.document).find(".uplaodTaskBox").click();
        }else{
            parent.emptyformw();
            $(window.parent.document).find(".bodyMask").fadeIn();
            parent.appendDitHtml();
            parent.getTag();
        }
    });
    $(window.parent.document).find("#clear-btn").click(function () {
        parent.emptyformw();
        window.location.reload();
    });
    $("#condif").click(function () {
        $("#condwhere").fadeIn();
    });
    $(".closed").click(function () {
        $("#condwhere").fadeOut();
    });

   
    $(".btnSearch").click(function () {
        var url = 'searchadv.html?';
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
        var wartime_start = $("#wartime_start").val();
        if (null!=wartime_start&&wartime_start != "") {
            data = data + "&wartime_start=" + wartime_start;
        }
        var wartime_end = $("#wartime_end").val();
        if (null!=wartime_end&&wartime_end != "") {
            data = data + "&wartime_end=" + wartime_end;
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
        var wartypevalue = "";
        $(".wartype .tag-li-in").each(function () {
            wartypevalue = $(this).attr("dictKey");
            data = data + "&combatArray=" + wartypevalue;
        })
        var armtypevalue = "";
        $(".armtype .tag-li-in").each(function () {
            armtypevalue = $(this).attr("dictKey");
            data = data + "&armsArray=" + armtypevalue;
        })
        var tagtypevalue = "";
        $(".tagtype .tag-li-in").each(function () {
            tagtypevalue = $(this).attr("dictKey");
            data = data + "&tagArray=" + tagtypevalue;
        })
        var doctypevalue = $("#serachType .acheck").attr("format");
        if (doctypevalue != "" && doctypevalue != null) {
            data = data + "&format=" + doctypevalue;
        }

        data = GAL_URL + url+ data;
        window.location.href = encodeURI(data);
    });
});