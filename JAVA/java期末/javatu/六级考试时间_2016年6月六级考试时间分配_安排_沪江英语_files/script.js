RegModule.RegContainer("regscrollcontainer", 1, 5);
var indexClass = new Index();	
function gs(href) {
    if (href.indexOf("?") > -1) {
        return href;
    } else {
        return href + "?source=" + 525;
    }
}
 
var SortScript = {};
SortScript.array = {
    // js 利用sort进行排序
    systemSort: function (array) {
        return array.sort(function (a, b) {
            return a - b;
        });
    },
    quickSort: function (array) {
        var i = 0;
        var j = array.length - 1;
        var Sort = function (i, j) {
            // 结束条件
            if (i == j) { return };
            var key = array[i];
            var stepi = i; // 记录开始位置
            var stepj = j; // 记录结束位置			
            while (j > i) {
                // j <<-------------- 向前查找
                if (array[j] >= key) {
                    j--;
                } else {
                    array[i] = array[j]
                    //i++ ------------>>向后查找
                    while (j > ++i) {
                        if (array[i] > key) {
                            array[j] = array[i];
                            break;
                        }
                    }
                }
            }
            // 如果第一个取出的 key 是最小的数
            if (stepi == i) {
                Sort(++i, stepj);
                return;
            }
            // 最后一个空位留给 key
            array[i] = key;
            // 递归
            Sort(stepi, i);
            Sort(j, stepj);
        }
        Sort(i, j);
        return array;
    }
}

$(function () {  //默认加载

    var ga_site_type = "msite";
    //$("#hjpassport").html($.trim($("#hjpassport").html()));
    SlideImgCheck();
    SingleArticleModuleSwitchCheck();
    MainNavPopLayout();//导航弹出层
    MainLeftBestCustomCommend();  //专题JS推荐
    SideH4TitleFix();
    MsiteTitleBind();//页面Logo标题绑定，搜索词绑定
    var ASlideDown = "a.slidedown";
    var UlSlideDown = "ul.slidedown";
    var PullIcon = "span.pull_down";
    var ThisIndex;
    var ThisNavPosition;
    $(ASlideDown).hover(function () {
        ThisNavPosition = $(this).position();
        ThisIndex = $(ASlideDown).index($(this));
        $(UlSlideDown).eq(ThisIndex).css({ display: "block", left: ThisNavPosition.left });
        $(PullIcon).eq(ThisIndex).addClass("active");
    }, function () {
        $(UlSlideDown).eq(ThisIndex).css("display", "none");
        $(PullIcon).eq(ThisIndex).removeClass("active");
    });

    $(UlSlideDown).hover(function () {
        $(this).css("display", "block");
        $(ASlideDown).eq(ThisIndex).addClass("current");
        $(PullIcon).eq(ThisIndex).addClass("active");
    }, function () {
        $(this).css("display", "none");
        $(ASlideDown).eq(ThisIndex).removeClass("current");
        $(PullIcon).eq(ThisIndex).removeClass("active");
    });

    $("h6.showmore").click(function () {
        var H6ShowMoreObj = $(this).prev("ul").children(".toggle");
        if (H6ShowMoreObj.css("display") == "none") {
            H6ShowMoreObj.css("display", "inline");
            $(this).html("收缩");
        } else {
            H6ShowMoreObj.css("display", "none");
            $(this).html("查看更多");
        }
    });
	
    var ThisType = $("#PageType").val();
    var ThisUrl = window.location.pathname;
    var ThisAObj, ThisNavUrl, ThisAHtml;
    var ThisHostName = window.location.hostname;

    /*
    if (ThisType == "default") {
        $("li." + ThisType).each(function () {
            $(this).find("a").addClass("current");
        });
    } else if (ThisType == "list") {
        $(".tab_bar li.default").each(function () {
            $(this).find("a").addClass("current");
        });
    } else {
        $(".tab_bar li." + ThisType).each(function () {
            $(this).find("a").addClass("current");
        });
    }*/

    if ($("h3.class_title a").is("a")) { //广告代码样式修正
        try {
            var ThisAhref = $("h3.class_title a").attr("href");
            if (ThisAhref.indexOf("www.hjclass.com") > -1 || ThisAhref.indexOf("class.hujiang.com") > -1) {
                ThisAhref = ThisAhref.replace("www.hjclass.com", "class.yeshj.com");
            }
            if (ThisAhref.indexOf("class.yeshj.com") < 0) {
                $("div.class_img").addClass("class_img_nobg").removeClass("class_img");
            }
        } catch (err) { }
    }
	
    /*
    if (!$("#btnSearch").is("span")) {
        $("#search_box").append("<span onclick='searchRedirect()' id='btnSearch' title='点击搜索'></span>");
    }*/
	
    $(".nav_con li").each(function () {
        ThisAObj = $(this).find("a");
        ThisNavUrl = ThisAObj.attr("href").toString().replace("http://" + ThisHostName, "");
        ThisAHtml = ThisAObj.html();
        if ($(this).attr("class") != "default") {
            if (ThisUrl.indexOf(ThisNavUrl) > -1) {
                $(this).find("a").addClass("current");
            } 
        } 
    });
	
    var ThisObj;
    $("img.lazy_img").each(function () {
        ThisObj = $(this);
        if (ThisObj.attr("src").length < 1) {
            ThisObj.attr("src", "http://i1.w.hjfile.cn/topic/hj8343.jpg");
        }
    });
		
    if ($("div.star_box").length > 0) {
        CheckStarEffect(SortScript);
    }
	
    var thisObj = $(".inner_tab_menu ul li a"); //绑定页面内特殊Tab切换区块。
    thisObj.click(function () {
        _index = thisObj.index($(this));
        thisObj.removeClass("current");
        $(this).addClass("current");
        $(".inner_ccBox .cc_content").eq(_index).css("display", "block").siblings(".cc_content").css("display", "none");
    });
	
    var AlinkHtml = "";
	
    $(".main_article_list .list_content a, #main_recommend a, .side_box .cc_content a.cm, .side_box .side_list a").each(function () {
        AlinkHtml = $.trim($(this).text());
        if (AlinkHtml.indexOf("img") < 0) {
            if (AlinkHtml.length > 2) {
                $(this).attr("title", AlinkHtml);
            }
        }
    });		
	
});

$(document).ready(function () {  //Dom结构加载完成要做的事情

    NewMSiteNetLessonTitleSetting();//网校课程链接文字title

    MainDefaultSlidePlayer();//首页默认幻灯播放，在首页加载完成后，自动播放

    LoadIframe(); //加载iframe

    BestTopicCommendCheck(); //首页精华推荐区块
    
    NetLessonBuyNowCheck();//网校课程购买

    SetDefaultSheTuanLinks(); //设定社团默认链接

    SetDetailDataBind(); //文章详情数据

    CheckLstBestPart(); //列表页精华推荐

    ListShowMoreCheck();//列表页更多显示

    if ($(".m-c-tabgroup ul li.tab").length > 0)
    {
        var ThisIndex = 0;
        var ThisMdIndex = 0;
        $(".m-c-tabgroup ul li.tab").hover(function () {
            ThisMdIndex = parseInt($(this).parent().parent().attr("data-args"));
            ThisIndex = $(".mdt" + ThisMdIndex + " ul li.tab").index($(this));
            $(this).addClass("on").siblings(".on").removeClass("on");
            $(".md" + ThisMdIndex).removeClass("show").eq(ThisIndex).addClass("show");
        });
        $(".tab-more").click(function () { 
            $(this).attr("href", $(this).prev("ul").find(".on").find("a").attr("href"));
        })
    }

    if ($(".m-c-pager ul li").length > 0) {
        var ThisIndex = 0;
        var ThisMdIndex = 0;
        $(".m-c-pager ul li").click(function () { 
            ThisIndex = $(".m-c-pager ul li").index($(this));
            $(this).addClass("active").siblings(".active").removeClass("active");
            $(".sglmd").removeClass("show").eq(ThisIndex).addClass("show");
        }); 
    }

    $(".m-atc-lst ul .m-atc-img").hover(
        function () {
            $(this).find(".m-atc-lst-imgbg").animate(
                    { height: "100%" }, 300
                );
            $(this).find("span").animate(
                 { top: "-5%"}, 300
            );
        },
        function () {
            $(this).find(".m-atc-lst-imgbg").animate(
                   { height: "46px" }, 300
               );
            $(this).find("span").animate(
                 { top: "39%"}, 300
            );
        }
    );

    $("#search_input").keypress(function (e) {
        if (e.keyCode == 13) {
            NewSearchRedirect();
        }
    });
    //搜索
    $("#search_button").click(function () {
        NewSearchRedirect();
        return false;
    });
    //查词
    $("#search_button_dict").click(function () {
        NewSearchRedirect("word");
        return false;
    });
    //select下拉框
    $("#search_select").mouseenter(function () {
        $(this).find("#cate_options").show();
        $(this).addClass("up");
    }).mouseleave(function () {
        $(this).find("#cate_options").hide();
        $(this).removeClass("up");
    });

    $("#cate_options li a").click(function () {
        var cateval = $(this).html();
        var type = $(this).attr("href").replace(/#/g, "");
        $("#selected_cate").html(cateval);
        $("#hiSearch").val(type);
        $("#cate_options").hide();
        return false;
    });

    //焦点在搜索框内变色
    $("#search_txt").mouseenter(function () {
        $(this).addClass("over");
    }).mouseleave(function () {
        var act = document.activeElement.id;
        if (act == "search_input") {
            return false;
        } else {
            $("#search_txt").removeClass("over");
        }
    });

    $("#search_input").blur(function () {
        $("#search_txt").removeClass("over");
    });
});

$(window).load(function () {    //加载完成执行的事情
    CommunityArticleListCheck();
});

var GetThisPageLogoTitle=function(){
	if($("#PageTitleText").length>0 && $("#PageTitleText").text()!=""){
		return $.trim($("#PageTitleText").text());
	}	
	var ThisPageTitle=$("title").html();	
    ThisPageTitle=ThisPageTitle.substring(0,ThisPageTitle.indexOf("_")); 
	return ThisPageTitle;
}
 
var SideH4TitleFix=function(){
	var EachSideIcon="<em class='s-icon'></em>";
	$(".side_box h4.side_title").each(function(){
		$(this).prepend(EachSideIcon);
	});
}
 
var CetDownCountPart = function () {
    if ($(".djs .djs_num").length > 0)
    {
        var cet_endtime;	var cet_nowtime;	var leftsecond;	
        var cet_d;	var cet_h;	var cet_m;	var cet_s; 
        var CetEndTimeStr;
        if ($("#top_custom").length > 0 && $("#top_custom").attr("alt") != undefined)
        {
            CetEndTimeStr=$("#top_custom").attr("alt").toString();
        } else
        {
            CetEndTimeStr = ((CetEndTimeStr != undefined && CetEndTimeStr.length > 0) ? CetEndTimeStr : "2013/12/14,09:00:00");
        }         
        var CetDownCount=function()
        {
            cet_endtime=new Date(CetEndTimeStr);
            cet_nowtime = new Date();
            leftsecond=parseInt((cet_endtime.getTime()-cet_nowtime.getTime())/1000);
            cet_d=parseInt(leftsecond/3600/24);
            cet_h=parseInt((leftsecond/3600)%24);
            cet_m=parseInt((leftsecond/60)%60);
            cet_s=parseInt(leftsecond%60);		   
            $(".djs .djs_num").html(cet_d);
            if(leftsecond<=0){
                clearInterval(sh);
            }
        }; 
        var sh = setInterval(CetDownCount, 1000);
    }
}(); 
/***四六级倒计时***/

var LoadIframe = function () {
    if ( $(".load-iframe").length < 1 ) { return; }
    var OrgDataArgs;
    var ThisDataArgs;
    var ifmTitle;
    var IframeTplWithTitle = "<div class=\"new-h-tit mb15\"><i class=\"bg30\"></i><a href=\"javascript:;\">{title}</a></div><div class=\"clearbox\">{iframecode}</div>";
    var IframeTpl = "<iframe src=\"{src}\" frameborder=\"{frameborder}\" scrolling=\"{scrolling}\" width=\"{width}\" height=\"{height}\" style=\"overflow-y:hidden;overflow-x:hidden\"></iframe>";
    var ThisTpl;
    $(".load-iframe").each(function () {
        OrgDataArgs = $(this).attr("data-args");
        if (OrgDataArgs == null || OrgDataArgs == undefined) { return; }
        ThisDataArgs = HJBase.parseQuery(OrgDataArgs);
        ifmTitle = ThisDataArgs["title"];
        ThisTpl = IframeTpl ;
        if (ifmTitle != null && ifmTitle != undefined && $.trim(ifmTitle).length>0 ) {
            ThisTpl = IframeTplWithTitle.replace("{iframecode}", IframeTpl);
        }
        ThisTpl = ThisTpl.replace("{title}", ifmTitle).replace("{src}", ThisDataArgs["src"]).replace("{width}", ThisDataArgs["width"]).replace("{height}", ThisDataArgs["height"]).replace("{scrolling}", ThisDataArgs["scrolling"]).replace("{frameborder}", ThisDataArgs["frameborder"]);
        $(this).append(ThisTpl);
    });
}

function CheckStarEffect(SortScript) {
    var ThisArray = new Array();
    var StarBox;
    var i = 0;
    var ThisID;
    var AllStar = "";
    $("div.star_box").each(function () {
        StarBox = $(this);
        ThisID = StarBox.attr("id");
        if (ThisID.length > 0 & ThisID != "undefined") {
            ThisArray[i] = ThisID.replace("star_", "");
            AllStar += ThisArray[i] + ",";
            i++;
        }
    });
    AllStar = (AllStar + "|").replace(",|", "");
    var ThisData = eval("[" + AllStar + "]");
    SortScript.array['quickSort'](ThisData);
    var x = 0;
    var ArrayLength = ThisData.length;
    var thisStarValue;
    var y = 0;
    while (x < ArrayLength) {
        y = ForDight((2.5 * x / (ArrayLength / 2)), 1);
        if (y < 2.2) { y = 2.5; }
        y = y * 10;
        $("#star_" + ThisData[x]).addClass("star_" + y);
        x++;
    }
}

function ForDight(Dight, How) { return Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How); }
var MainDefaultSlidePlayer = function ()
{
    if ($("#idSlider").length > 0) { //幻灯图片
        //幻灯片
        var slider = $("#idSlider").bxSlider({
            captions: true,
            auto: true,
            speed: 700,
            controls: false,
            pause: 3000,
            autoHover: false
        });
    }
}

var MainLeftBestCustomCommend = function () {
    if ($(".zt_slide").length > 0) {
        eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('(6($){$.1g.1w=6(o){o=$.1f({r:n,x:n,N:n,17:q,J:n,L:1a,16:n,y:q,u:12,H:3,B:0,k:1,K:n,I:n},o||{});8 G.R(6(){p b=q,A=o.y?"15":"w",P=o.y?"t":"s";p c=$(G),9=$("9",c),E=$("10",9),W=E.Y(),v=o.H;7(o.u){9.1h(E.D(W-v-1+1).V()).1d(E.D(0,v).V());o.B+=v}p f=$("10",9),l=f.Y(),4=o.B;c.5("1c","H");f.5({U:"T",1b:o.y?"S":"w"});9.5({19:"0",18:"0",Q:"13","1v-1s-1r":"S","z-14":"1"});c.5({U:"T",Q:"13","z-14":"2",w:"1q"});p g=o.y?t(f):s(f);p h=g*l;p j=g*v;f.5({s:f.s(),t:f.t()});9.5(P,h+"C").5(A,-(4*g));c.5(P,j+"C");7(o.r)$(o.r).O(6(){8 m(4-o.k)});7(o.x)$(o.x).O(6(){8 m(4+o.k)});7(o.N)$.R(o.N,6(i,a){$(a).O(6(){8 m(o.u?o.H+i:i)})});7(o.17&&c.11)c.11(6(e,d){8 d>0?m(4-o.k):m(4+o.k)});7(o.J)1p(6(){m(4+o.k)},o.J+o.L);6 M(){8 f.D(4).D(0,v)};6 m(a){7(!b){7(o.K)o.K.Z(G,M());7(o.u){7(a<=o.B-v-1){9.5(A,-((l-(v*2))*g)+"C");4=a==o.B-v-1?l-(v*2)-1:l-(v*2)-o.k}F 7(a>=l-v+1){9.5(A,-((v)*g)+"C");4=a==l-v+1?v+1:v+o.k}F 4=a}F{7(a<0||a>l-v)8;F 4=a}b=12;9.1o(A=="w"?{w:-(4*g)}:{15:-(4*g)},o.L,o.16,6(){7(o.I)o.I.Z(G,M());b=q});7(!o.u){$(o.r+","+o.x).1n("X");$((4-o.k<0&&o.r)||(4+o.k>l-v&&o.x)||[]).1m("X")}}8 q}})};6 5(a,b){8 1l($.5(a[0],b))||0};6 s(a){8 a[0].1k+5(a,\'1j\')+5(a,\'1i\')};6 t(a){8 a[0].1t+5(a,\'1u\')+5(a,\'1e\')}})(1x);', 62, 96, '||||curr|css|function|if|return|ul|||||||||||scroll|itemLength|go|null||var|false|btnPrev|width|height|circular||left|btnNext|vertical||animCss|start|px|slice|tLi|else|this|visible|afterEnd|auto|beforeStart|speed|vis|btnGo|click|sizeCss|position|each|none|hidden|overflow|clone|tl|disabled|size|call|li|mousewheel|true|relative|index|top|easing|mouseWheel|padding|margin|200|float|visibility|append|marginBottom|extend|fn|prepend|marginRight|marginLeft|offsetWidth|parseInt|addClass|removeClass|animate|setInterval|0px|type|style|offsetHeight|marginTop|list|jCarouselLite|jQuery'.split('|'), 0, {}));
        //javascript效果设置代码： 
        var ZtHotCommendNum = $(".zt_slide li").length;
        $(".zt_hot_commend").jCarouselLite({
            //auto: 2000,
            btnNext: ".btn_right",
            btnPrev: ".btn_left",
            speed: 800,
            visible: ZtHotCommendNum
        });
    }
}

var MainNavPopLayout = function () {
    if ($(".nav-float-plane").length > 0 && $(".nav-con-new").length > 0) //导航弹出层
    {
        $(".nav-float-plane").hover(
                function () {
                    $(this).removeClass("hide");
                },
                function () {
                    $(this).addClass("hide");
                }
            );
        $(".nav-con-new").hover(
            function () {
                $(".nav-float-plane").removeClass("hide");
            },
            function () {
                $(".nav-float-plane").addClass("hide");
            }
        );
    }
}


var MsiteTitleBind = function () {
    if ($("#xiaozhan_title").length > 0 && $.trim($("#xiaozhan_title").html()).length <1)
    {
        var ThisPageTitle = GetThisPageLogoTitle(); 
        $("#xiaozhan_title").html(ThisPageTitle);
        var SearchOptTxt = "<div id='selected_cate'>文章</div><input id='lstNewType' type='hidden' value='en'><ul id='cate_options' style='display: none;'><li><a href='#link'>文章</a></li><li><a href='#word'>单词</a></li></ul>";
        $("#search_select").html(SearchOptTxt);
        $("#search_button").html("搜&nbsp;索");
        $("#search_button_dict").html("查&nbsp;词");
        $("#lstNewType").val($.trim($(".hiLangs").val()));
    }
}


var BestTopicCommendCheck = function ()
{
    if($(".m-best-c").length > 0)
    {
        var BestTopicCommendCount=$(".zt_hot_commend ul li").length;
        if (BestTopicCommendCount > 0 && BestTopicCommendCount < 10)
        {
            $(".m-best-c .btn_left, .m-best-c .btn_right").addClass("bghide");
        }
    }
}
var SlideImgCheck = function () {
    $(".slider li").remove(".slider .sl-hide");  //移除空白幻灯图片
    $(".slider li img").addClass("hide");  //隐藏幻灯中的图片
}

var SingleArticleModuleSwitchCheck = function () {
    var ThisIndex = 1;
    $(".sglmd").each(function(){
        ThisIndex = $(".sglmd").index($(this));
        if ($.trim($(this).html()).length < 100)
        {
            $(".m-c-pages li").eq(ThisIndex).addClass("hide");
        }
    });
}

var CommunityArticleListCheck = function () {
    var StMdLstLiCount = $(".st-md-lst li").length;
    if (StMdLstLiCount > 0)
    {
        $(".st-md-lst li").eq(0).addClass("nbg");
        if (StMdLstLiCount > 6) {
            $(".st-md-lst li").eq(6).addClass("nbg");
        }
        else {
            if ((".m-magc").length > 1) {
                (".m-magc").eq(1).addClass("hide");
            }
        }
    }
}

var NewMSiteNetLessonTitleSetting = function () {
    if ($(".course_title a.audt").length < 1) { return; }
    $(".course_title a.audt").each(function () {
        $(this).html($(this).attr("title"));
    });
}

var CheckLstBestPart = function () {
    if ($(".lst-bst").length > 0) {
        var LstBest = $(".lst-bst").text();
        var html = $.trim(LstBest).replace(/\s+/g, "");
        if (LstBest.indexOf("img") < 0 && html.length < 20) {
            $(".lst-bst").addClass("hide");
        }
    }
}

var NetLessonBuyNowCheck = function () {
    if ($(".buy-n").length > 0)
    {
        var ThisClassLink;
        var ThisAlinkTpm = "<a href='{link}' target='_blank'>{name}</a>";
        $(".buy-n").each(function () {
            ThisClassLink = $(this).attr("data-arg");
            $(this).html(ThisAlinkTpm.replace("{link}", ThisClassLink).replace("{name}", "免费试听"));
        });
    }
}

var SetDefaultSheTuanLinks = function () {
    var sArray = DefaultSheTuanLinks();
    if ($(".mls-ln1 li").length < 1) {
        $(".mls-ln1").append(sArray[0] + sArray[1]);
    }
    if ($(".mls-ln2 li").length < 1) {
        $(".mls-ln2").append(sArray[2] + sArray[3]);
    }
}

var SetDetailDataBind = function () {
    if ($(".dt-clnt").length > 0)
    {
        var ThisID = "";
        var i = 0;
        $(".dt-clnt").each(function () {
            ThisID = $.trim($(this).attr("id"));
            i = ThisID.lastIndexOf("_");
            if (i > -1) {
                i = i + 1;
                ThisID = ThisID.substring(i);
            }
            $(this).attr("id", ThisID);
        });
    }
}

var DefaultSheTuanLinks = function () {
    var sArray=new Array(
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/cet/' target='_blank'>四六级火线联盟 - 资讯 资料 交流</a></li>",
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/yykb/' target='_blank'>英语酷吧 - 在线练习听力口语</a></li>",
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/hjkaoyan/' target='_blank'>沪江考研 - 资料下载 考友交流</a></li>", 
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/133341789/' target='_blank'>留学CLUB - 出国留学 雅思 托福</a></li>",
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/bec/' target='_blank'>BEC托业考神团 - 资讯 资料 答疑</a></li>",
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/mymusic/' target='_blank'>英乐社 - 欧美 日韩 多语种歌曲</a></li>",
        "<li><i></i><a rel='nofollow' href='http://st.hujiang.com/abcenglish/' target='_blank'>零基础英语 - 从零开始学英语</a></li>"
        );
    return GetRandomIntArray(sArray); //乱序过后的列表     
}

var GetRandomIntArray = function(sArray)
{
    var Count = sArray.length;
    var Index0 = 0, Index1 = 0, NumTmp = 0, IteratorCount = 0, TmpNum=0;
    for (IteratorCount = 0; IteratorCount < Count; IteratorCount++)
    {
        TmpNum = Count - IteratorCount;
        Index0 = Math.floor(Math.random() * TmpNum);
        Index1 = Count - IteratorCount - 1;
        NumTmp = sArray[Index0];
        sArray[Index0] = sArray[Index1];
        sArray[Index1] = NumTmp;
    }
    return sArray;
} 

//搜索跳转
function NewSearchRedirect(source) {
    var word = $("#search_input").val();
    if (word == "") return;
    key = encodeURIComponent(word);

    var langs = $("#lstNewType").val();
    var type = source || $("#hiSearch").val();
    var url = "";
    switch (type) {
        case "word":
            url = "http://dict.hjenglish.com/w/" + key;
            break;
        case "link":
            if (langs == "en")
                url = "http://www.hjenglish.com/new/search/" + key + "/";
            else if (langs == "jp")
                url = "http://jp.hjenglish.com/new/search/" + key + "/";
            else if (langs == "fr")
                url = "http://fr.hujiang.com/new/search/" + key + "/";
            else if (langs == "kr")
                url = "http://kr.hujiang.com/new/search/" + key + "/";
            else if (langs == "es")
                url = "http://es.hujiang.com/new/search/" + key + "/";
            else if (langs == "de")
                url = "http://de.hujiang.com/new/search/" + key + "/"; 
            break;
    }
    window.open(url, "_blank");
}

//搜索框 回车键 搜索
function NewTxtEnter(eventobject) {
    if (eventobject.keyCode == 13) {
        NewSearchRedirect();
    }
}

var ListShowMoreCheck = function () {
    if ($("#MainListShowMore").length > 0) //显示更多模块
    {
        var DefaultListShowCount = parseInt($(".main-cntlst").attr("data-count"));
        var CountNum = 0;
        var PageNum = parseInt($(".main-cntlst").attr("data-pagenum"));
        if (PageNum < 2) {
            $(".main-cntlst ul li").each(function () {
                if (CountNum > DefaultListShowCount - 1) {
                    $(this).addClass("hide");
                }
                CountNum++;
            });

            var LstLength = $(".main-cntlst ul li").length;
            var LstHideLength = $(".main-cntlst ul li.hide").length;
            if (LstLength > DefaultListShowCount) {
                var ThisTmp = $.trim($("#MainListShowMore").attr("data-template"));
                $("#MainListShowMore a").html(
                        ThisTmp.replace("{0}", (LstLength - DefaultListShowCount))
                    ).parent().show();
            }

            $("#MainListShowMore a").click(
            function () {
                $(".main-cntlst ul li.hide").removeClass("hide");
                if ($(".page_list a").length > 0) {
                    $(".page_list").removeClass("hide");
                }
                $(this).hide();
            });
        }
        else {
            if ($(".page_list a").length > 0) {
                $(".page_list").removeClass("hide");
            }
        }
    }
}