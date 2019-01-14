(function ($, window, undefined) {
    var elems = $([]),
        jq_resize = $.resize = $.extend($.resize, {}),
        timeout_id,
        str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';
    jq_resize[str_delay] = 250;
    jq_resize[str_throttle] = true;
    $.event.special[str_resize] = {
        setup: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var elem = $(this);
            elems = elems.add(elem);
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });
            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },
        add: function (handleObj) {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();
                old_handler.apply(this, arguments);
            }

            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function () {
            elems.each(function () {
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data(this, str_data);
                if (width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }
            });
            loopy();
        }, jq_resize[str_delay]);
    }
})(jQuery, this);

$.ajaxSetup({
    complete: function(xhr) {
        //token过期，则跳转到登录页面
        if(xhr.responseJSON.status == 401){
            parent.location.href = 'login.html';
        }
    }
});
function initulctrl(tid,select_tag){
    $("#"+tid+" .tag-li").removeClass("tag-li-in");
    $("#"+tid+" .tag-li").each(function () {
        var tag_html = $(this).html();
        if (""!=select_tag&&null!=select_tag){
            if (select_tag.indexOf(tag_html) > -1) {
                $(this).addClass("tag-li-in");
            }
        }
    })
}

function getFormatDate(dtTime) {
    var date = new Date(dtTime);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        //+ " " + date.getHours() + seperator2 + date.getMinutes()
        //+ seperator2 + date.getSeconds();
    return currentdate;
}
function docDetailOpenController(docId){
    //appendDitHtml();
    //getTag();
    var docObj = getDocObjecLoad(docId);
    $("#filebtn .preview").remove();
    $("#filebtn .download").remove();
    var suffx = docObj.format.replace(".","");
    if (suffx == "pdf"||suffx == "doc"||suffx == "docx") {
        // var hrefurl = "openword.html?filePath="+result.data.filePath+"&docId="+tid;
        var hrefurl = "phoibe/document/previewDoc/"+docId;
        hrefurl = GAL_URL+hrefurl;
        $("#filebtn").append("<a target='_blank' href='"+hrefurl+"'><span class='preview' style='cursor: pointer; color: #666;'>查看</span></a>");
    }
    var downurl = GAL_URL + "phoibe/document/download?Id=" + docId;
    $("#filebtn").append("&nbsp;&nbsp;<a target='_blank' href='"+downurl+"'><span class='download' style='cursor: pointer;color: #666; '>下载</span></a>");
    $("#formthelist .state").remove();
    $("#picker").hide();
    $("#submit").hide();
    $(".bodyMask").fadeIn();
}
function docDetailRecoverController(){
    $("#filebtn .preview").remove();
    $("#filebtn .download").remove();
    $("#picker").show();
    $(window.parent.document).find("#submit").show();
}
function getulvaluestr(tid,params){
    var warstateArray = "";
    var isValid=false;
    $("#"+tid+" .tag-li-in").each(function () {
        var tag_html = $(this).html();
        warstateArray = warstateArray +tag_html+",";
        isValid=true;
    });
    if(warstateArray.length>1){
        warstateArray=warstateArray.substring(0,warstateArray.length-1);
    }
    if(!isValid){return "";}
    var data ="&"+params+"="+warstateArray;
    return data;
}

function hotsearchLoadAjax(){
    var data = GAL_URL+"phoibe/document/hotsearch";
    var resultData=[];
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            resultData=result.data;
        }
    });
    return resultData;
}

function isVedio(format){
    //alert(format)
    if(format=="mp4" || format=="avi" || format=="mpeg" || format=="wmv" || format=="mp3"){
        return true;
    }
   return false;
}

function getdocicon(format){
    var icon = "";
    //alert(getdocicon)
    if (format == "pdf") {
        icon = "<i class='pdf'></i>";
    }
    else if (format == "doc" || format == "docx") {
        icon = "<i class='doc'></i>";
    }
    else if(format=="mp4" || format=='avi' || format=='mpeg' || format=='wmv'){
        icon = "<i class='mp4'></i>";//
    }
    else if(format=="mp3")
    {
        icon = "<i class='mp3'></i>";//
    }
    else{
        icon = "<i class='exls'></i>";//
    }
    return icon;
}
function usersearchLoadAjax(){
    var data = GAL_URL+"phoibe/document/usersearch";
    var resultData=[];
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            resultData=result.data;
        }
    });
    return resultData;
}function logOptionTypeLoadAjax(){
    var data = GAL_URL+"phoibe/logging/toJsonLogType";
    var dataOption={};
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            dataOption = result;
        }
    });
    return dataOption;
}
function dataDictSelectHtml() {
    var dictObj = dataDictLoadAjax();
    var dictSelectObj={};
    for (var obj in dictObj) {
        var selectHtml="";
        $.each(dictObj[obj],function (i,val) {
            if (checktype(obj)) {
            selectHtml += "<option value='" + val["dictName"] + "'>" + val["dictName"] + "</option>";
            dictSelectObj[obj] = selectHtml;
            //alert(obj+"-"+selectHtml);
            //alert(obj+"-"+selectHtml);
            }
        });
        selectHtml="";
        $.each(dictObj[obj],function (i,val) { {
            if (checktype(obj.toLowerCase())) {
                var cid=obj+val['id'];
                selectHtml += "<li id='"+cid+"' onclick=\"onselectedtag(\'"+cid+"\')\" class='tag-li' tagid='" + val["id"] + "'>" + val["dictName"] + "</li>";
                dictSelectObj[obj.toLowerCase() + "u"] = selectHtml;
            }
        }});
    }
    return dictSelectObj;
}
function dataDictLoadAjax(){
    var data = GAL_URL+"phoibe/dict/list/0/1000/1?dictType=1";
    var dataDict={};
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            $.each(result.data.dataList, function (i, val) {

                var groupKey =val["groupKey"];
                var obj= {
                    id: val["id"],
                    dictName: val["dictName"]
                }
                if (null!=dataDict[groupKey]){
                    var listobj = dataDict[groupKey];
                    listobj.push(obj);
                    dataDict[groupKey] = listobj;
                } else {
                    dataDict[groupKey] = [obj];
                }
            });
        }
    });
    return dataDict;
}
function appendDitHtml(){
    var dataDict = dataDictSelectHtml();
    //alert("t");
    for (var obj in dataDict){
        var fieldObj = selectfield(obj);
        var fieldfn = fieldObj.fn;

        var optionhtml="";//<option  value=''></option>";
        if(""!=fieldfn){
            if(checktype(fieldfn)){
                $("."+fieldfn).append(optionhtml+dataDict[obj]);
            }
        }
        else {
            $("#" + obj).append(dataDict[obj]);
        }
    }
}
function checktype(field) {

    if ($("select[id=" + field.toLowerCase() + "]") != null || $("select[id=" + field.toUpperCase() + "]") != null) {
        //alert(field);
       return true;
    }
    if ($("ul[id='" + field.toLowerCase() + "u']") != null || $("ul[id='" + field.toUpperCase() + "u']") != null){
        alert(field);
        return false;
    }
    return false;
}

function selectfield(field){
    var fieldname="";//在映射类中的字段名，查询用
    var fieldtitle="";
    switch (field.toUpperCase()) {
        case "WARSTATE" :
            fieldtitle= "参战国家";
            fieldname= "warstate";
            break;
        case "WARNUM" :
            fieldtitle= "作战规模";
            fieldname= "warnum";
            break;
        case "WARADDR" :
            fieldtitle= "作战地域";
            fieldname= "waraddr";
            break;
        case "WARSTYPE" :
            fieldtitle= "战例类型";
            fieldname= "warstype";
            break;
        case "CORPSTYPE" :
            fieldtitle= "兵种类型";
            fieldname= "corpstype";
            break;
        case "FIGHTTIME" :
            fieldtitle= "作战年代";
            fieldname= "fighttime";
            break;
        case "FIGHTTYPE" :
            fieldtitle= "战法类别";
            fieldname= "fighttype";
            break;
        case "COMBATTYPESTRING" :
            fieldtitle= "战斗种类";
            fieldname= "combattypestring";
            break;
        case "FIGHTTRAIT" :
            fieldtitle= "作战特点";
            fieldname= "fighttrait";
            break;
    }

    return {fn:fieldname,ft:fieldtitle};
}
function tagLoadAjax(num){
    var data = GAL_URL+"phoibe/tag/list/0/"+num+"?1=1";
    var dataList;
    $.ajax({
        url: data,
        type: "GET",
        dataType: "json",
        async:false,
        contentType:"application/json;charset=UTF-8",
        success: function (result)
        {
            dataList = result.data.dataList;
        }
    });
    return dataList;
}

function roleAuthObject(roleType) {

    var roleObj = {
        commonRole: {
            path: "",
            ops: ""
        },
        putRole: {
            path: "index-m.html,stockmgr.html",
            ops: ""
        },
        auditRole: {
            path: "index-m.html,auditupload.html,commgr.html",
            ops: ""
        },
        adminRole: {
            path: "index-m.html,percenter.html,usermgr.html,tagmgr.html,logmgr.html",
            ops: ""
        },
        superRole: {
            path: "index-m.html,stockmgr.html,auditupload.html,commgr.html,percenter.html,usermgr.html,tagmgr.html,datamgr.html,logmgr.html",
            ops: ""
        }
    }

    var ret_roleobje={};
    if (roleType==103){
        //103	普通用户
         ret_roleobje = roleObj.commonRole;
    }
    if (roleType==104){
        //104	系统审核员
        ret_roleobje = roleObj.auditRole;
    }
    if (roleType==105){
        //105	系统入库员
        ret_roleobje = roleObj.putRole;

    }
    if (roleType==102){
        //101	系统管理员
        ret_roleobje = roleObj.adminRole;
    }
    if (roleType==101){
        //101	超级管理员
        ret_roleobje = roleObj.superRole;
    }
    return ret_roleobje;
}
function userAuthController(){
    var userStr = getCookie("userObject");
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        // "data":{"id":2,
        // "userName":"admin",
        // "type":1,
        // "createTime":"2018-08-25 15:48:22",
        // "realname":"管理员",
        // "status":1,"nickname":"管理员",
        // "roleType":102,"roleName":"管理员"}}

        var userId = userObject.id;
        var userName = userObject.userName;
        var userType = getUserType(userObject.type);
        var createTime = userObject.createTime;
        var status = userObject.status;
        var nickname = userObject.nickname;
        var roles = userObject.roles;

        var roleobj_path ="";
        for (var i in roles){
            var roleName = roles[i].roleName;
            var roleType = roles[i].roleType;

            var obj = roleAuthObject(roleType);

            roleobj_path = roleobj_path+","+obj.path;
        }

        $(".userName").html(nickname);
        $(".userIdentity").html(userType);

        $("#nav_left").hide();
        $(".fl").find("li").hide();


        $(".fl").find("li").each(function(){
           var data_toggle =  $(this).attr("data-toggle");
            var pd = roleobj_path.indexOf(data_toggle);
            //alert(pd+"--"+roleType+"--"+path+"--"+data_toggle);
            if(pd>-1){
                $("#nav_left").show();
                $(this).show();
                $("#main-content").css("padding-left", "260px");
                $("#nav_left").delay(5).animate({ left: '0' });
                $("#nav_arrow").attr("data-value", 1);
            }
        })
        if (roleobj_path==","){
            $("#main-content").css("padding-left", "20px");
            $(this).remove();
        }
    }
}
function getUserType(type){
       var typename ="";
    if (type == 1) {
        typename = "军";
    } else if (type == 2 ) {
        typename = "师";
    } else if (type == 3) {
        typename = "旅";
    } else if (type == 4 ) {
        typename = "团";
    } else if (type == 5) {
        typename = "营";
    } else if (type == 6 ) {
        typename = "连";
    } else if (type == 7) {
        typename = "排";
    } else if (type == 8 ) {
        typename = "班";
    } else if (type == 9) {
        typename = "兵";
    } else if (type == 10) {
        typename = "参谋";
    }
       return typename;
}
function getUrlString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
};


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function authExit() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/logout',
        dataType: 'json',
        success: function (result) {
        }
    });

}
function cutString(str, len) {

    if (null==str||""==str){
        return "";
    }
    //length属性读出来的汉字长度为1
    if (str.length * 2 <= len) {
        return str;
    }

    var strlen = 0;

    var s = "";

    for (var i = 0; i < str.length; i++) {

        s = s + str.charAt(i);

        if (str.charCodeAt(i) > 128) {

            strlen = strlen + 2;

            if (strlen >= len) {

                return s.substring(0, s.length - 1) + "...";

            }

        } else {

            strlen = strlen + 1;

            if (strlen >= len) {

                return s.substring(0, s.length - 2) + "...";

            }

        }
    }
    return s;
}
function getUrlParam(paramStr,paramneme) {
    var reg = new RegExp("(^|&)" + paramneme + "=([^&]*)(&|$)", "i");

    var result = paramStr.match(reg);
    if (result == null || result.length < 1) {
        return "";
    }
    return result[2];
}

function onselectedtag(tid){
   // alert(tid);
        if ($("#"+tid).hasClass('tag-li-in')) {
            $("#"+tid).removeClass('tag-li-in');
        } else {
            //alert($(this).attr("class"));
            $("#"+tid).addClass('tag-li-in');
        }
}


function appendTagHtml() {
    var dataList = tagLoadAjax(10000);
    var rowhtml = "";
    $.each(dataList, function (i, val) {
        var id = val["id"];
        var name = val["name"];//"标签名称";
        var cid="tag"+id;
        rowhtml +="<li id="+cid+" onclick=\"onselectedtag('"+cid+"')\" class='tag-li' dictkey='"+id+"'>"+name+"</li>";
    });
    $("#tag").html(rowhtml);

}

function setscroll(ctrl){
    var tobj = ctrl;
        $(tobj).niceScroll({
            cursorcolor: "#7197eb",
            cursoropacitymax: 1,
            touchbehavior: false,
            cursorwidth: "10px",
            cursorborder: "0",
            cursorborderradius: "2px",
            autohidemode: false
        });
}
function initseltag(){
    $(".tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
}

$(function(){
    userAuthController();
    appendDitHtml();
    //alert("t");
    $("#back").click(function () {
        history.back();
    });
    //appendTagHtml();
    //左侧页面导航切换
    $('.main .navLeft li').on('click',function(){
        $(this).addClass('active').siblings('.navList').removeClass('active')
        var taggle = $(this).attr('data-toggle');
        $("#frm-main").attr("src",taggle);
        //var dataToggle='page'+;
        //$('.main .container .page').removeClass('show')
        // $('.main .container').find('.'+dataToggle).addClass('show')
    });
    //多选框
    $('li.checkBox').on('click', function () {
        var checked = $(this).attr("checked");
        if(checked!=null&&checked == "checked"){
            $(this).removeAttr('checked');
        }else{
            $(this).attr('checked','checked');
        }
        $(this).toggleClass('check')

    });
})