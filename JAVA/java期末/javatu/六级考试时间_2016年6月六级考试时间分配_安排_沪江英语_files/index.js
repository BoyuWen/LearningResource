var _isAgree=!1,_isTransAgree=!1,_isRecAgree=!1,_remarking=!1,_firstWord=!0,_isActive=!1,_awardInfo,_title="",_message="",_argu="",_txtInterval=null,jsonpAjaxUrl=0<location.host.indexOf(".hujiang.com")?"http://en.hujiang.com":"http://www.hjenglish.com",_enhostname="http://"+window.location.host;function Index(){}
Index.prototype._getLangs=function(){var a=window.location.host.replace(/\d+/,"").match(/(\w+)\.\w+\.\w+$/),b="all";2<=a.length&&(b="www.hjenglish.com"==a[0]?"en":a[1],"www"==b&&(b="all"));return b};function GetNewRegOpenSite(a){var b=!1;switch(a){case "all":case "en":case "jp":case "fr":case "kr":case "xiaoxue":case "zhongxue":case "gaokao":case "liuxue":case "yuer":case "bb":case "es":case "de":case "ru":case "th":case "xyz":b=!0}return b}
var _loginAlertMessage="\u62b1\u6b49\uff0c\u6b64\u529f\u80fd\u53ea\u80fd\u5728\u767b\u5f55\u4e4b\u540e\u624d\u80fd\u4f7f\u7528,\u8bf7\u5148 <a href=\"javascript:;\" onclick=\"DoRecord(this,'\u5185\u9875_\u767b\u5f55');HJBase.quickLogin({reload:true,source:'"+Index.prototype._getLangs()+"'});\" style='text-decoration:underline;'>\u767b\u5f55</a> \u6216 <a onclick=\"DoRecord(this,'\u5185\u9875_\u6ce8\u518c')\" style='text-decoration:underline;' target='_blank' href='https://pass.hujiang.com/reg_bulo/?source="+
Index.prototype._getLangs()+"'>\u6ce8\u518c</a>.";
GetNewRegOpenSite(Index.prototype._getLangs())&&(_loginAlertMessage='\u62b1\u6b49\uff0c\u6b64\u529f\u80fd\u53ea\u80fd\u5728\u767b\u5f55\u4e4b\u540e\u624d\u80fd\u4f7f\u7528,\u8bf7\u5148 <a href="javascript:;" class="fastLogin" data-source="'+Index.prototype._getLangs()+'"  style=\'text-decoration:underline;\'>\u767b\u5f55</a> \u6216 <a style=\'text-decoration:underline;\' href="javascript:;" class="fastRegister" data-source="'+Index.prototype._getLangs()+'">\u6ce8\u518c</a>.');
Index.prototype._timer=function(a,b){setTimeout("$('#"+a+"').html('')",1E3*b)};
function Collection(a,b,c){if("0"==$("#hiUserID").val())_title="\u767b\u5f55\u7528\u6237\u624d\u80fd\u6536\u85cf",_message=_loginAlertMessage.replace(Index.prototype._getLangs()+"2010",Index.prototype._getLangs()+"down2010"),Index.prototype.popAskToLogin();else{var e=1==-1<location.href.toString().indexOf("/new/")?1:2;1==e?DoRecord(this,"\u5185\u9875_\u6536\u85cf\u6587\u7ae0"):2==e&&DoRecord(this,"\u4e0b\u8f7d_\u5185\u9875_\u6536\u85cf\u8d44\u6599");$.ajax({type:"GET",url:"http://www.hjenglish.com/handler/linkuser.json?type=2&contentid="+
a+"&linktitle="+b+"&collectiontype="+e+"&linkurl="+window.location.href.replace("#","")+"&rdm="+1E5*Math.random()+"&callback=?",dataType:"jsonp",jsonp:"callback",success:function(a){"false"==a.content?$("#"+c).html("\u62b1\u6b49\uff0c\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5\u3002"):($("#"+c).html("<a target='_blank' href='/new/uc/"+$("#hiUserID").val()+"/' title='\u70b9\u51fb\u8fdb\u5165\u6211\u7684\u6536\u85cf\u4e2d\u5fc3' style='color:#ff6600;text-decoration:underline;'>\u5df2\u6536\u85cf&gt;&gt;</a>"),
2==e&&$("#spCollectionCount").html(+$("#spCollectionCount").html()+1),_isActive=!0)}})}}
Index.prototype.userCollection=function(a){if("0"==$("#hiUserID").val())_title="\u767b\u5f55\u7528\u6237\u624d\u80fd\u6536\u85cf",_message=_loginAlertMessage.replace(Index.prototype._getLangs()+"2010",Index.prototype._getLangs()+"down2010"),Index.prototype.popAskToLogin();else{var b=1==-1<location.href.toString().indexOf("/new/")?1:2;if(-1<location.href.indexOf("/kuaiji")||-1<location.href.indexOf("/gongwuyuan"))b=4;1==b||4==b?DoRecord(this,"\u5185\u9875_\u6536\u85cf\u6587\u7ae0"):2==b&&DoRecord(this,
"\u4e0b\u8f7d_\u5185\u9875_\u6536\u85cf\u8d44\u6599");$.ajax({type:"GET",url:"http://www.hjenglish.com/handler/linkuser.json?type=2&contentid="+$("#hiContentID").val()+"&linktitle="+$("#hiTitle").val()+"&collectiontype="+b+"&linkurl="+window.location.href.replace("#","")+"&rdm="+1E5*Math.random()+"&callback=?",dataType:"jsonp",jsonp:"callback",success:function(c){"false"==c.content?$("#"+a).html("\u62b1\u6b49\uff0c\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5\u3002"):(4==b?$("#"+
a).html("<a target='_blank' href='/uc/"+$("#hiUserID").val()+"/' title='\u70b9\u51fb\u8fdb\u5165\u6211\u7684\u6536\u85cf\u4e2d\u5fc3' style='color:#ff6600;text-decoration:underline;'>\u5df2\u6536\u85cf&gt;&gt;</a>"):$("#"+a).html("<a target='_blank' href='/new/uc/"+$("#hiUserID").val()+"/' title='\u70b9\u51fb\u8fdb\u5165\u6211\u7684\u6536\u85cf\u4e2d\u5fc3' style='color:#ff6600;text-decoration:underline;'>\u5df2\u6536\u85cf&gt;&gt;</a>"),2==b&&$("#spCollectionCount").html(+$("#spCollectionCount").html()+
1),_isActive=!0)}})}};
Index.prototype.LinksAgree=function(){$("#spAgreeNumInfo").css("display","inline");if(_isAgree)Index.prototype._showAgreeAbout(),$("#spAgreeNumInfo").html("\u4f60\u5df2\u7ecf\u652f\u6301\u8fc7\u4e86!"),Index.prototype._timer("spAgreeNumInfo",2);else{DoRecord(this,"\u5185\u9875_\u9876\u4e00\u4e0b");var a="";-1<location.href.indexOf("/gongwuyuan")?a="/gongwuyuan/2009/Handler/link.ashx":-1<location.href.indexOf("/kuaiji")?a="/kuaiji/2009/Handler/link.ashx":(a="http://www.hjenglish.com",-1<window.location.host.indexOf("hujiang.com")&&
(a="http://en.hujiang.com"),a+="/2009/Handler/link.ashx");$.ajax({url:a,data:{type:1,contentid:$("#hiContentID").val(),username:$("#hiUserName").val(),userid:$("#hiUserID").val(),rdm:1E5*Math.random()},dataType:"jsonp",success:function(a){"true"!=a?(Index.prototype._showAgreeAbout(),$("#spAgreeNumInfo").html("\u4f60\u5df2\u7ecf\u652f\u6301\u8fc7\u4e86!"),Index.prototype._timer("spAgreeNumInfo",2)):($("#agree_num").html(+$("#agree_num").html()+1),Index.prototype._showAgreeAbout(),_isActive=!0);_isAgree=
!0}})}};Index.prototype._showAgreeAbout=function(){0<$("#HJer_link ul li").length&&($("#HJer_link").removeClass("hide"),$("#HJer_link").addClass("block"));0<$("#HJer_agreeU ul li").length&&($("#HJer_agreeU").removeClass("hide"),$("#HJer_agreeU").addClass("block"))};Index.prototype.controlList=function(){$("#app_main").slideToggle("1500")};
Index.prototype.updateTransAgree=function(){if(!(2>arguments.length)){var a=arguments[1];_isTransAgree&&1==a?($("#divTransInfo").html("\u5df2\u63a8\u8350"),Index.prototype._timer("divTransInfo",2)):(1==a?$("#divTransInfo").html("<img src='/2009/images/loading.gif' />"):$("#divLecInfo").html("<img src='/2009/images/loading.gif' />"),$.get(_enhostname+"/handler/linkuser.json",{type:3,transID:arguments[0],rdm:1E5*Math.random()},function(){1==a&&($("#digg_trans_num").html(+$("#digg_trans_num").html()+
1),$("#divTransInfo").html(""),_isTransAgree=!0);_isActive=!0}))}};
Index.prototype.addCheckMistake=function(){var a=$(".mistakeArea:last").val(),b=$(".suggestArea:last").val();"0"==$("#hiUserID").val()?(_title="\u64cd\u4f5c\u5931\u8d25",_message=_loginAlertMessage,Index.prototype.popAskToLogin()):4E3<a.length||4E3<b.length?$(".helpMistake:last").html("<span class='red bold'>\u62b1\u6b49\uff0c\u6700\u591a\u53ea\u80fd\u8f93\u51654000 \u4e2a\u5b57</span>"):1>a.length&&1>b.length?$(".helpMistake:last").html("<span class='red bold'>\u6765\u90fd\u6765\u4e86\uff0c\u603b\u5f97\u5199\u70b9\u4ec0\u4e48\u5427\uff01</span>"):($(".helpMistake:last").html("<img src='/2009/images/loading.gif' /> \u63d0\u4ea4\u4e2d..."),
$.ajax({url:jsonpAjaxUrl+"/2009/Handler/link.ashx",data:{type:3,contentid:$("#hiContentID").val(),username:$("#hiUserName").val(),errorcontent:$(".mistakeArea:last").val(),suggestcontent:$(".suggestArea:last").val(),linkurl:window.location.href.replace("#",""),userid:$("#hiUserID").val(),rdm:1E5*Math.random()},dataType:"jsonp",success:function(a){"1"==a?$(".helpMistake:last").html("<span class='red bold'>\u6765\u90fd\u6765\u4e86\uff0c\u603b\u5f97\u5199\u70b9\u4ec0\u4e48\u5427\uff01</span>"):"2"==
a?$(".helpMistake:last").html("<span class='red bold'>\u8bf7\u6ce8\u610f\u554a\uff0c\u60a8\u7684\u8f93\u5165\u53ef\u80fd\u542b\u6709\u654f\u611f\u5b57\u7b26</span>"):"3"==a?$(".helpMistake:last").html("<span class='red bold'>\u62b1\u6b49\uff0c\u6bcf\u4eba\u6bcf\u7bc7\u6700\u591a\u53ea\u80fd\u63d0\u4ea43\u6b21</span>"):"4"==a&&($(".helpMistake:last").html("<span class='green'>\u63d0\u4ea4\u6210\u529f\uff01\u975e\u5e38\u611f\u8c22\u4f60\u7684\u70ed\u5fc3\u80a0\uff013\u79d2\u540e\u81ea\u52a8\u5173\u95ed\u7a97\u53e3\uff01</span>"),
_isActive=!0,$(".helpMistake:last").fadeTo(3E3,0.3,function(){HJpop.closeAll()}))}}))};
Index.prototype.addLinkTrans=function(){"0"==$("#hiUserID").val()?(_title="\u64cd\u4f5c\u5931\u8d25",_message=_loginAlertMessage,Index.prototype.popAskToLogin()):($(".helpTrans:last").html("<img src='/2009/images/loading.gif' />  \u63d0\u4ea4\u4e2d..."),$.post(_enhostname+"/2009/Handler/link.ashx",{type:4,contentid:$("#hiContentID").val(),username:$("#hiUserName").val(),userid:$("#hiUserID").val(),transcontent:$(".pop_textarea:last").val(),rdm:1E5*Math.random()},function(a){"1"==a?$(".helpTrans:last").html("<span class='red bold'>\u6765\u90fd\u6765\u4e86\uff0c\u603b\u5f97\u5199\u70b9\u4ec0\u4e48\u5427\uff01</span>"):
"3"==a?$(".helpTrans:last").html("<span class='red bold'>\u62b1\u6b49\uff0c\u6bcf\u4eba\u6bcf\u7bc7\u6700\u591a\u53ea\u80fd\u63d0\u4ea43\u6b21\u7ffb\u8bd1\u7a3f</span>"):"4"==a?($(".helpTrans:last").html("<span class='green'>\u63d0\u4ea4\u6210\u529f\u4e86\uff01\u5ba1\u6838\u901a\u8fc7\u540e\u5927\u5bb6\u5c31\u80fd\u770b\u5230\u4e86\u30025\u79d2\u540e\u81ea\u52a8\u5173\u95ed\u7a97\u53e3\uff01</span><div class='post_success'><img src='/2009/images/pic_success.gif'/></div>"),$(".pop_textarea:last").hide(),
$(".positive:last").hide(),_isActive=!0,$(".helpTrans:last").fadeTo(5E3,0.3,function(){HJpop.closeAll()})):$(".helpTrans:last").html("<span class='red bold'>\u62b1\u6b49\uff0c\u6bcf\u4eba\u6bcf\u7bc7\u6700\u591a\u53ea\u80fd\u63d0\u4ea43\u6b21\u7ffb\u8bd1\u7a3f</span>")}))};
Index.prototype.addLinkRec=function(a){""!=a&&("0"==$("#hiUserID").val()?$(".spRecInfo:last").html("\u5bf9\u4e0d\u8d77\uff0c\u8bf7\u60a8\u5148\u767b\u5f55"):($(".spRecInfo:last").html("<img src='/2009/images/loading.gif' /> \u63d0\u4ea4\u4e2d..."),$.get(_enhostname+"/handler/linkuser.json",{type:4,contentid:$("#hiContentID").val(),username:$("#hiUserName").val(),userid:$("#hiUserID").val(),recfile:a.toString(),rdm:1E5*Math.random()},function(a){"True"!=a?$(".spRecInfo:last").html("<span class='red bold'>\u62b1\u6b49\uff0c\u5f55\u97f3\u4fdd\u5b58\u88ab\u53d6\u6d88\uff0c\u4e00\u7bc7\u6587\u7ae0\u6700\u591a\u53ea\u80fd\u63d0\u4ea4\u4e09\u6b21\u5f55\u97f3\u54e6~</span>"):
($(".spRecInfo:last").html("<span class='green'>\u63d0\u4ea4\u6210\u529f\u4e86\uff01\u5ba1\u6838\u901a\u8fc7\u540e\u5927\u5bb6\u5c31\u80fd\u770b\u5230\u4e86\u30025\u79d2\u540e\u81ea\u52a8\u5173\u95ed\u7a97\u53e3\uff01</span><div class='post_success'><img src='/2009/images/pic_success.gif'/></div>"),$(".divluyincontrol:last").hide(),$(".helpRec:last").hide(),_isActive=!0,$(".spRecInfo:last").fadeTo(5E3,0.3,function(){HJpop.closeAll()}))})))};
Index.prototype.updateRecAgreeeNum=function(a){_isRecAgree||($("#divRecInfo").html("<img src='/2009/images/loading.gif' />"),$.get(_enhostname+"/handler/linkuser.json",{type:5,recid:a,rdm:1E5*Math.random()},function(){$("#digg_num_rec").html(+$("#digg_num_rec").html()+1);$("#diggit_num_box").css("cursor","auto");$("#divRecInfo").html("");_isActive=_isRecAgree=!0}))};
Index.prototype.popRecLayer=function(){DoRecord(this,"\u5185\u9875_\u8d21\u732e\u5f55\u97f3");if("0"==$("#hiUserID").val())_title="\u767b\u5f55\u72b6\u6001\u624d\u80fd\u5f55\u97f3\u54e6",_message=_loginAlertMessage,Index.prototype.popAskToLogin();else{var a=new HJpop({width:500,height:265,title:"\u4e3a\u672c\u6587\u63d0\u4f9b\u5f55\u97f3 <img src='/2009/images/ico_coin.gif'/> <a href='http://bulo.hjenglish.com/group/topic/252557/' target='_blank'>(?)</a>",isOkToClose:!1,isModal:!1,hasOperation:!1,
okCallback:function(){Index.prototype.addLinkRec()}});a.content.innerHTML=$("#rec_layer").html();a.show()}};
Index.prototype.popMistakeLayer=function(){DoRecord(this,"\u5185\u9875_\u6311\u9519");if("0"==$("#hiUserID").val())_title="\u767b\u5f55\u7528\u6237\u624d\u80fd\u6311\u9519\u54e6",_message=_loginAlertMessage,Index.prototype.popAskToLogin();else{var a;a=$.browser.msie?new HJpop({width:370,height:360,title:"\u4e3a\u672c\u6587\u6311\u9519",isOkToClose:!1,isModal:!1,hasOperation:!0,hasCancleBtn:!0,okCallback:function(){Index.prototype.addCheckMistake()}}):new HJpop({width:370,height:400,title:"\u4e3a\u672c\u6587\u6311\u9519",
isOkToClose:!1,isModal:!1,hasOperation:!0,hasCancleBtn:!0,okCallback:function(){Index.prototype.addCheckMistake()}});a.content.innerHTML=$("#mistake_layer").html();a.show()}};
Index.prototype.popTransLayer=function(){DoRecord(this,"\u5185\u9875_\u8d21\u732e\u7ffb\u8bd1\u7a3f");if("0"==$("#hiUserID").val())_title="\u767b\u5f55\u7528\u6237\u624d\u80fd\u7ffb\u8bd1\u6587\u7ae0\u54e6",_message=_loginAlertMessage,Index.prototype.popAskToLogin();else{var a;a=$.browser.msie?new HJpop({width:400,height:230,title:"\u4e3a\u672c\u6587\u8d21\u732e\u7ffb\u8bd1\u7a3f <img src='/2009/images/ico_coin.gif'/>  <a href='http://bulo.hjenglish.com/group/topic/252556/' target='_blank'>(?)</a>",
isOkToClose:!1,isModal:!1,hasOperation:!0,hasCancleBtn:!0,okCallback:function(){Index.prototype.addLinkTrans()}}):new HJpop({width:450,height:260,title:"\u4e3a\u672c\u6587\u8d21\u732e\u7ffb\u8bd1\u7a3f <img src='/2009/images/ico_coin.gif'/>  <a href='http://bulo.hjenglish.com/group/topic/252556/' target='_blank'>(?)</a>",isOkToClose:!1,isModal:!1,hasOperation:!0,hasCancleBtn:!0,okCallback:function(){Index.prototype.addLinkTrans()}});a.content.innerHTML=$("#trans_layer").html();a.show()}};
Index.prototype.popAskToLogin=function(){var a=getLangs();HJReg.GetNewRegOpenSite(a)?window.HJPassport&&HJPassport.show("login"):(a=new HJpop({title:_title,ico:1,isModal:!0}),a.content.innerHTML="<div class='hjpop_icotext'>"+_message+"</div>",a.show())};Index.prototype.popSuccess=function(){var a=new HJpop({title:_title,ico:3,isModal:!0});a.content.innerHTML="<div class='hjpop_icotext'>"+_message+"</div>";a.show()};
Index.prototype.showENCN=function(a){Index.prototype._switchTabClass(a);$(".langs_cn").css("color","#006200");$(".langs_cn").show();$(".langs_en").show();$("br").show()};Index.prototype.showEN=function(a){Index.prototype._switchTabClass(a);$(".langs_en").show();$(".langs_cn").hide();$(".langs_cn + br").hide();$(".langs_en + br").show()};Index.prototype.showCN=function(a){Index.prototype._switchTabClass(a);$(".langs_cn").show();$(".langs_en").hide();$(".langs_cn + br").show();$(".langs_en + br").hide()};
Index.prototype._switchTabClass=function(a){for(var b=$(a)[0].parentNode.parentNode,b=$(b).find("li"),c=b.length,e=0;e<c;e++)b[e].className="";$(a)[0].parentNode.className="current"};Index.prototype._htmlEncode=function(a){var b="";if(0==a.length)return"";b=a.replace(/&/g,"&gt;");b=b.replace(/</g,"&lt;");b=b.replace(/>/g,"&gt;");b=b.replace(/    /g,"&nbsp;");b=b.replace(/\'/g,"&#39;");b=b.replace(/\"/g,"&quot;");return b=b.replace(/\n/g,"<br />")};
Index.prototype.updateLinkView=function(){$.ajax({url:jsonpAjaxUrl+"/handler/linkuser.json",data:{type:1,contentid:$("#hiContentID").val(),linktitle:$("#hiTitle").val(),rdm:1E5*Math.random()},dataType:"jsonp",success:function(){}})};
Index.prototype.controlWord=function(a){"none"==$(".recite_usertype:first").css("display")&&(_firstWord&&(DoRecord(this,"\u5185\u9875_\u9ed8\u8bb0\u80cc\u5355\u8bcd"),_firstWord=!1),"none"!=$("#img_"+a).parent().css("display")?($("#img_"+a).parent().css("display","none"),$("#sp_"+a).css("display","inline")):($("#img_"+a).parent().css("display","inline"),$("#sp_"+a).css("display","none")))};
Index.prototype.showAllExplain=function(){$("#recite_type2").removeClass("tab_recite_current");$("#recite_type2").addClass("tab_recite");$("#recite_type1").removeClass("tab_recite");$("#recite_type1").addClass("tab_recite_current");"none"!=$(".recite_usertype:first").css("display")&&($(".recite_usertype").css("display","none"),$(".recite_button").parent().css("display","inline"),$(".recite_expword").css("display","none"),$(".recite_base").children().show(),$(".recite_base").css("width",-1<window.location.host.indexOf("kr")?
"120px":"210px"),Index.prototype.showFirstWord(),$(".recite_explanation").css("margin-left","0px"))};
Index.prototype.showAllWrite=function(){DoRecord(this,"\u5185\u9875_\u8f93\u5165\u80cc\u5355\u8bcd");$("#recite_type1").removeClass("tab_recite_current");$("#recite_type1").addClass("tab_recite");$("#recite_type2").removeClass("tab_recite");$("#recite_type2").addClass("tab_recite_current");"none"==$(".recite_usertype").css("display")&&($(".txtWord").val(""),$(".txtWord").next().html("<img src='/2009/images/blankspace.png' />"),$(".recite_word").hide(),$(".recite_base").each(function(){var a=parseInt($(this).children(":first").width())+
parseInt($(this).children(":last").width());$(this).css("width",a);$(this).next().css("width",280-a+"px")}),$(".recite_base").css("width",-1<window.location.host.indexOf("kr.hujiang.com")?"20px":"110px"),$(".recite_explanation").css("width","260px"),$(".recite_button").parent().hide(),$(".recite_expword").show(),$(".recite_usertype").css("display","inline"),$(".recite_expword").parent().css("margin-left","5px"),$(".txtWord:first").focus())};
Index.prototype.checkWord=function(a,b,c){var e=$("#aWord_"+a).html(),g=$("#txt_"+a).val(),e=$.trim(e),g=$.trim(g);"1"==b?13==c.keyCode&&(b=$("#txt_"+a).parent().parent().next().children(".recite_usertype").children("input:text"),0<b.length?b.focus():$("#txt_"+a).blur()):""!=g&&(e.toLowerCase()==g.toLowerCase()?$("#txt_"+a).next().html(" <img src='/2009/images/right.png' />"):($("#txt_"+a).next().html(" <img src='/2009/images/wrong.png'  align='absmiddle'/> "+e),$("#txt_"+a).next().attr("title",e)))};
Index.prototype.controlWordList=function(){$("#recite_box").toggle()};Index.prototype.clearWordText=function(a){$(a).next().html("<img src='/2009/images/blankspace.png' />")};Index.prototype.showFirstWord=function(){$(".recite_button:first").parent().css("display","none");$(".recite_expword:first").css("display","inline")};
Index.prototype.showPopMenuNav=function(a,b){$("#popmenu_level1").css("display","none");$("#popmenu_level2").css("display","none");var c="#"+b,e="#"+a;$(e).addClass("current");$(c).show();$(c).mouseover(function(){$(c).show();$(e).addClass("current")});$(c).mouseout(function(){$(c).hide();$(e).removeClass("current")})};
Index.prototype.shareTo=function(a){_isActive=!0;var b=document.title.substring(0,document.title.indexOf("_")),c=location.href,e=$("#sharebox_summary").text(),g=$("#sharebox_topicurl").text(),h=$("#hjNav a.bold").text()||$("#path_box a:first").text()||"\u6caa\u6c5f\u5206\u4eab",j=window.location.host,c=0<c.indexOf("#")?c.toString().substring(0,c.toString().indexOf("#")):c,b=encodeURIComponent(b),f="";switch(a){case "renren":f="\u4eba\u4eba";window.open("http://share.renren.com/share/buttonshare.do?link="+
c+"&title="+b);break;case "kaixin":f="\u5f00\u5fc3";d=document;t=d.selection?"None"!=d.selection.type?d.selection.createRange().text:"":d.getSelection?d.getSelection():"";kaixin=window.open("http://www.kaixin001.com/~repaste/repaste.php?&rurl="+c+"&rtitle="+b+"&rcontent="+b,"kaixin");kaixin.focus();break;case "douban":f="\u8c46\u74e3";window.open("http://www.douban.com/recommend/?url="+c+"&title="+b+"");break;case "xinlangweibo":f="\u65b0\u6d6a\u5fae\u535a";a="\u300a"+decodeURIComponent(b)+"\u300b\uff08"+
c+"\uff09\uff1a"+e+"";a=a.cutString(280);a=encodeURIComponent(a);window.open("http://v.t.sina.com.cn/share/share.php?appkey=1763324258&content=utf-8&pic="+encodeURIComponent(g)+"&title="+a);break;case "baidu":f="\u767e\u5ea6\u641c\u85cf";window.open("http://cang.baidu.com/do/add?it="+b+"&iu="+c+"&dc=&fr=ien#nw=1");break;case "QQ":f="QQ";window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+c);break;case "ruolin":f="\u82e5\u6797";window.open("http://share.wealink.com/share/add/?title="+
b+"&content="+encodeURIComponent("\u627e\u5230\u4e86\u597d\u4e1c\u897f\uff0c\u548c\u5927\u5bb6\u5206\u4eab\u4e00\u4e0b\uff0c\u5927\u5bb6\u90fd\u6765\u770b\u770b\u5427\u3002")+"&url="+c);break;case "ing":f="ing";window.open("http://t.hujiang.com/frame/shareIng.aspx?title="+b+"&url="+c+"&sitename="+encodeURIComponent(h)+"&siteurl="+encodeURIComponent("http://"+j+"/"));break;default:f="_error",alert("\u53d1\u751f\u9519\u8bef\uff01\u8bf7\u5230\u7f51\u7ad9\u5c0f\u7ec4\u53cd\u9988\u9519\u8bef\uff01")}DoRecord(this,
"\u5176\u4ed6_\u5206\u4eab\u5230"+f)};
Index.prototype.down=function(){var a=+$("#hiMessage").val();2==a?$("#liMessage").html("<span style='color:red;'>\u5bf9\u4e0d\u8d77\uff0c\u60a8\u4eca\u5929\u7684\u4e0b\u8f7d\u5df2\u7ecf\u8fbe\u5230\u4e86\u6700\u5927\uff0c\u8bf7\u767b\u5f55\u540e\u4e0b\u8f7d</span>"):3==a?$("#liMessage").html("<span style='color:red;'>\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u6caa\u5143\u4e0d\u8db3\uff0c\u8be6\u60c5\u8bf7\u67e5\u770b\u4e0b\u9762\u7684\u5e2e\u52a9</span>"):1==a&&(a=encodeURI($("#hiTitle").val()),$.get(_enhostname+
"/2009/Handler/down.ashx",{type:1,downid:$("#hiContentID").val(),title:a,rdm:1E5*Math.random()}))};
Index.prototype.reportDownItems=function(){var a=$(".report_info:last").val();""==a||400<a.length||5>a.length?$(".report_message:last").html("\u8bf7\u8f93\u5165\u5408\u9002\u957f\u5ea6\u7684\u4e3e\u62a5\u4fe1\u606f"):$.get("/2009/Handler/down.ashx",{type:2,downid:$("#hiContentID").val(),info:a,rdm:1E5*Math.random()},function(a){"1"==a?($(".report_message:last").html("<span class='green'>\u611f\u8c22\u4f60\u7684\u89c1\u4e49\u52c7\u4e3a</span>"),$(".helpMistake:last").fadeTo(3E3,0.3,function(){HJpop.closeAll()}),
$("#aReport").html("\u611f\u8c22\u4f60\u7684\u89c1\u4e49\u52c7\u4e3a"),Index.prototype.removeClick("aReport")):"2"==a?$(".report_message:last").html("\u4e3e\u62a5\u5931\u8d25\uff0c\u8bf7\u8f93\u5165\u5408\u9002\u957f\u5ea6\u7684\u4e3e\u62a5\u4fe1\u606f"):"3"==a&&$(".report_message:last").html("\u5bf9\u4e0d\u8d77\uff0c\u60a8\u5df2\u7ecf\u4e3e\u62a5\u8fc7\u8be5\u4e0b\u8f7d")})};
Index.prototype._getUserFace=function(){var a=$("#hiUserID").val();if(0!=a){for(;4>a.length;)a="0"+a;var b=a.substr(a.length-4,2),c=a.substr(a.length-2,2);return"http://i2.hjfile.cn/f48/"+b+"/"+c+"/"+a+".jpg"}};
Index.prototype.upDownAgree=function(){$("#spAgreeNumInfo").css("display","inline");_isAgree?($("#spAgreeNumInfo").html("\u4f60\u5df2\u7ecf\u652f\u6301\u8fc7\u4e86!"),Index.prototype._timer("spAgreeNumInfo",2)):(DoRecord(this,"\u4e0b\u8f7d_\u5185\u9875_\u9876\u4e00\u4e0b"),$.get(_enhostname+"/2009/Handler/down.ashx",{type:3,downid:$("#hiContentID").val(),rdm:1E5*Math.random()},function(a){"1"==a&&($("#agree_num").html(+$("#agree_num").html()+1),_isActive=_isAgree=!0)}))};
Index.prototype.removeClick=function(a){$("#"+a).css({color:"gray","text-decoration":"none",cursor:"text"});$("#"+a).click(function(){})};Index.prototype.setInviteUrl=function(){var a="http://"+window.location.host+"/dl/p"+$("#hiContentID").val()+"/",b=$("#hiInviteCode").val();"0"!=b&&(a=a+"?downID="+b);a=a+" "+$("#hiTitle").val();$("#txtInvite").val(a)};
Index.prototype.popReportLayer=function(){HJpop.closeAll();var a;a=$.browser.msie?new HJpop({width:350,height:255,title:"\u4e3e\u62a5\u8be5\u8d44\u6599\uff1a",isOkToClose:!1,isModal:!1,hasOperation:!0,hasCancleBtn:!0,okCallback:function(){Index.prototype.reportDownItems()}}):new HJpop({width:370,height:270,title:"\u4e3e\u62a5\u8be5\u8d44\u6599\uff1a",isOkToClose:!1,isModal:!1,hasOperation:!0,hasCancleBtn:!0,okCallback:function(){Index.prototype.reportDownItems()}});a.content.innerHTML=$("#report_layer").html();
a.show()};
Index.prototype.alertDownInfo=function(){var a=$("#hiMessage").val();if("1"!=a){var b="";GetNewRegOpenSite(Index.prototype._getLangs())?"2"==a?b="\u5bf9\u4e0d\u8d77\uff0c\u7531\u4e8e\u4f60\u672a<a href='javascript:;' class='fastLogin' data-source='"+Index.prototype._getLangs()+"'>\u767b\u5f55</a>\uff0c<span class='red'>\u5e76\u8fbe\u5230\u4e86\u6700\u5927\u4e0b\u8f7d\u6b21\u6570</span>\uff0c\u70b9\u51fb <a href='javascript:;' class='fastLogin' data-source='"+Index.prototype._getLangs()+"'>\u767b\u5f55</a> \u6216 <a href='javascript:;' class='fastRegister' data-source='"+
Index.prototype._getLangs()+"_down' >\u6ce8\u518c</a>\uff0c\u4eab\u53d7\u65e0\u9650\u5236\u514d\u8d39\u4e0b\u8f7d\u5427\u3002":"3"==a?b="\u5bf9\u4e0d\u8d77\uff0c\u7531\u4e8e\u4f60\u7684<a href='/new/p103560/' target='_blank' title='\u4ec0\u4e48\u662f\u6caa\u5143?'>\u6caa\u5143</a>\u5c11\u4e8e <span class='red'>10</span> \u6caa\u5143\uff0c\u65e0\u6cd5\u4e0b\u8f7d\uff0c\u70b9\u51fb\u67e5\u770b<a href='/new/p103560/' target='_blank' title='\u4ec0\u4e48\u662f\u6caa\u5143?'>\u6caa\u5143</a>\u8be6\u60c5\u3002&nbsp;<span class='gray'>\u6caa\u6c5f\u8d44\u6e90\u5b8c\u5168\u514d\u8d39\uff0c\u6caa\u5143\u662f\u8bba\u575b\u865a\u62df\u8d27\u5e01</span>":
"4"==a&&(b="\u7531\u4e8e\u4f60\u672a\u767b\u5f55\uff0c\u53ea\u80fd\u514d\u8d39\u4e0b\u8f7d 3 \u6b21,\u70b9\u51fb <a href='javascript:;' class='fastLogin' data-source='"+Index.prototype._getLangs()+"'>\u767b\u5f55</a> \u6216 <a href='javascript:;' class='fastRegister' data-source='"+Index.prototype._getLangs()+"_down'>\u6ce8\u518c</a>\uff0c\u4eab\u53d7\u65e0\u9650\u5236\u514d\u8d39\u4e0b\u8f7d\u5427\u3002"):"2"==a?b="\u5bf9\u4e0d\u8d77\uff0c\u7531\u4e8e\u4f60\u672a<a href='javascript:;' onclick=\"HJBase.quickLogin({reload:true,source:'"+
Index.prototype._getLangs()+"'})\">\u767b\u5f55</a>\uff0c<span class='red'>\u5e76\u8fbe\u5230\u4e86\u6700\u5927\u4e0b\u8f7d\u6b21\u6570</span>\uff0c\u70b9\u51fb <a href='javascript:;' onclick=\"HJBase.quickLogin({reload:true,source:'"+Index.prototype._getLangs()+"'})\">\u767b\u5f55</a> \u6216 <a href='https://pass.hujiang.com/reg_bulo/?source="+Index.prototype._getLangs()+"_down' target='_blank'>\u6ce8\u518c</a>\uff0c\u4eab\u53d7\u65e0\u9650\u5236\u514d\u8d39\u4e0b\u8f7d\u5427\u3002":"3"==a?b="\u5bf9\u4e0d\u8d77\uff0c\u7531\u4e8e\u4f60\u7684<a href='/new/p103560/' target='_blank' title='\u4ec0\u4e48\u662f\u6caa\u5143?'>\u6caa\u5143</a>\u5c11\u4e8e <span class='red'>10</span> \u6caa\u5143\uff0c\u65e0\u6cd5\u4e0b\u8f7d\uff0c\u70b9\u51fb\u67e5\u770b<a href='/new/p103560/' target='_blank' title='\u4ec0\u4e48\u662f\u6caa\u5143?'>\u6caa\u5143</a>\u8be6\u60c5\u3002&nbsp;<span class='gray'>\u6caa\u6c5f\u8d44\u6e90\u5b8c\u5168\u514d\u8d39\uff0c\u6caa\u5143\u662f\u8bba\u575b\u865a\u62df\u8d27\u5e01</span>":
"4"==a&&(b="\u7531\u4e8e\u4f60\u672a\u767b\u5f55\uff0c\u53ea\u80fd\u514d\u8d39\u4e0b\u8f7d 3 \u6b21,\u70b9\u51fb <a href='javascript:;' onclick=\"HJBase.quickLogin({reload:true,source:'"+Index.prototype._getLangs()+"'})\">\u767b\u5f55</a> \u6216 <a href='https://pass.hujiang.com/reg_bulo/?source="+Index.prototype._getLangs()+"_down' target='_blank'>\u6ce8\u518c</a>\uff0c\u4eab\u53d7\u65e0\u9650\u5236\u514d\u8d39\u4e0b\u8f7d\u5427\u3002");$(".btnDown").click(function(){$("#downInfo").html(b);$("#downInfo").css("font-weight",
"bold")});$(".multi_link").click(function(){$("#downInfo").html(b);$("#downInfo").css("font-weight","bold")})}};
Index.prototype.showShareEggMessage=function(){var a=_awardInfo;if(!(1>a.toString().indexOf("^"))){var b=a.toString().split("^"),c="";4>+b[0]?(c="\u606d\u559c\u4f60\u4e2d\u4e86 <span>"+b[1]+" </span>\u6caa\u5143 ! ",_argu="\u606d\u559c\u4f60\u4e2d\u4e86 "+b[1]+" \u6caa\u5143 ! ",a="\u8be5\u5956\u52b1\u5df2\u53d1\u9001\uff0c\u5c06\u7d2f\u52a0\u5230\u60a8\u7684\u6caa\u6c5f\u8d26\u6237\u4e2d\u3002"):4==+b[0]&&(c="\u5947\u8ff9\uff01\u4f60\u7adf\u7136\u4e2d\u4e86 <span>5</span> \u5b66\u5e01 !",_argu="\u5947\u8ff9\uff01\u4f60\u7adf\u7136\u4e2d\u4e86 5 \u5b66\u5e01 !",
a="\u7ecf\u8fc7\u5ba1\u6838\u540e\uff0c\u6211\u4eec\u4f1a\u53d1\u9001\u5b66\u5e01\uff0c\u5e76\u77ed\u4fe1\u901a\u77e5\u60a8\u3002");b="";b=-1<location.href.indexOf("/gongwuyuan")||-1<location.href.indexOf("/kuaiji")?"<div id='div_egginfo' ><p class='title'>\u9f50\u5206\u4eab\uff0c\u7838\u5f69\u86cb\uff0c\u4e2d\u5927\u5956\uff01</p><p class='message'>"+c+"</p><p class='info'>"+a+"</p><p class='info'><a href='http://www.hjenglish.com/new/p97984/' target='_black' >\u5206\u4eab\u4e2d\u5956\u8bf4\u660e >></a></p><p class='btn'><img src='/gongwuyuan/2009/images/gwy/btn_egg.jpg'  onclick='indexClass.hideShareEggMessage();' /></p></div>":
"<div id='div_egginfo' ><p class='title'>\u9f50\u5206\u4eab\uff0c\u7838\u5f69\u86cb\uff0c\u4e2d\u5927\u5956\uff01</p><p class='message'>"+c+"</p><p class='info'>"+a+"</p><p class='info'><a href='/new/p108884/' target='_black' >\u5206\u4eab\u4e2d\u5956\u8bf4\u660e >></a></p><p class='btn'><img src='/2009/images/btn_egg.jpg'  onclick='indexClass.hideShareEggMessage();' /></p></div>";$("#egg_layer").html(b)}};String.prototype.getByteCount=function(){return this.replace(/[^\u0000-\u00ff]/g,"12").length};
String.prototype.cutString=function(a){var b=this,c=b.getByteCount();if(c<=a)return b;for(;c>a-3&&0<c;)b=b.substring(0,b.length-1),c=b.getByteCount();return b+"..."};
Index.prototype.DoTask=function(a){"0"==$("#hiUserID").val()?(_title="\u767b\u5f55\u7528\u6237\u624d\u80fd\u5f97\u5230\u6caa\u5143\u5956\u52b1",_message="\u53ea\u6709\u767b\u5f55\u7528\u6237\u624d\u80fd\u5f97\u5230\u6caa\u5143\u5956\u52b1\u54e6\uff0c\u8d76\u5feb <a onclick=\"DoRecord(this,'\u5185\u9875_\u767b\u5f55')\" style='text-decoration:underline;' href='https://pass.hujiang.com/?url="+location.href+"'>\u767b\u5f55</a> \u6216 <a onclick=\"DoRecord(this,'\u5185\u9875_\u6ce8\u518c')\" style='text-decoration:underline;' target=\"_blank\" href='https://pass.hujiang.com/reg_bulo/?source="+
Index.prototype._getLangs()+"'>\u6ce8\u518c</a> \u5427.",Index.prototype.popAskToLogin()):$.get(_enhostname+"/2009/Handler/task_headnews.ashx",{type:1,id:a},function(){$("#task_li"+a).addClass("del")})};
Index.prototype.dlAudioAskLogin=function(){var a="https://pass.hujiang.com/reg_bulo/?source="+(Index.prototype._getLangs()+"_listen_audio");_title="\u8bf7\u5148\u767b\u5f55\u6216\u6ce8\u518c";_message="<div style='line-height:25px;font-size:14px;'>\u6ce8\u518c\uff0c\u53ea\u8981\u5341\u51e0\u79d2\u949f\u2026\u2026<br/>\u548c\u5343\u4e07\u6caa\u53cb\u4e00\u8d77\uff0c\u4eab\u53d7\u6d77\u91cf\u8d44\u6e90\uff01<br/>\u8bf7\u7acb\u5373 <a onclick=\"DoRecord(this,'\u5185\u9875_\u767b\u5f55')\" style='text-decoration:underline;' href='https://pass.hujiang.com/?url="+location.href+
"'>\u767b\u5f55</a> \u6216 <a onclick=\"DoRecord(this,'\u5185\u9875_\u4e0b\u8f7d\u97f3\u9891\u6ce8\u518c')\" style='text-decoration:underline;' target='_blank' href='"+a+"'>\u6ce8\u518c</a> </div>";a=new HJpop({title:_title,ico:1,isModal:!0,width:320,height:200,hasOperation:!1});a.content.innerHTML="<div class='hjpop_icotext' style='margin-top:35px;'>"+_message+"</div>";a.show()};
$(function(){var a;a:{if("undefined"!=typeof ActiveXObject){try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(b){}if(a){a=!0;break a}}a="undefined"!=typeof navigator.plugins&&navigator.plugins["Shockwave Flash"]?!0:!1}!a&&document.createElement("video").canPlayType&&($("embed[src*='http://player.youku.com/player.php/sid/']").each(function(){var a=$(this).attr("src").match(/\/sid\/(\w+)\/v.swf/)[1],a=' <video  controls="controls" style="width:'+$(this).width()+"px;height:"+$(this).height()+
'px" src="http://v.youku.com/player/getRealM3U8/vid/'+a+'/type//video.m3u8"></video>';$(this).replaceWith(a)}),$("embed[src*='http://www.tudou.com/v/']").each(function(){var a=$(this).attr("src").match(/www.tudou.com\/v\/(\w+)\//)[1],a='<iframe style="width:'+$(this).width()+"px;height:"+$(this).height()+'px"  frameborder="0" src="http://www.tudou.com/programs/view/html5embed.action?code='+a+'"></iframe>';$(this).replaceWith(a)}))});
