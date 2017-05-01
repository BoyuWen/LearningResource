/// <reference path="hjbase.js" />
(function () {
    var cookie_name = 'announce-colse0821';
    var init = function () {

        var html1 = '<div class="announce1" style="text-align: center;line-height: 26px;">&nbsp;</div>';
        //var html2 = '<div class="announce2" style="text-align: center;line-height: 26px;border-top: 1px solid #F0C36D;background-color: #F9EDBE;position: fixed;top: 0px;left: 0px;z-index: 9999;width: 100%;border-bottom: 1px solid #F0C36D;">为了给大家提供更好的服务，沪江门户网站定于2015年9月19日凌晨01:00 - 05:00进行系统维护，届时网站将暂停访问，对此造成的不便，敬请谅解！    <a href="#close" style="color:#075DB3;" class="announce-colse">关闭</a></div>';
        var html2 = '<div class="announce2" style="text-align: center;line-height: 26px;border-top: 1px solid #F0C36D;background-color: #F9EDBE;position: fixed;top: 0px;left: 0px;z-index: 9999;width: 100%;border-bottom: 1px solid #F0C36D;">'
        html2 += '【重要通知】亲爱的沪友，沪元将于2016年2月25日起正式停止发放，沪元（新）将闪亮登场。';
        html2 += '<a href="http://st.hujiang.com/topic/167173131437/" style="color:#075DB3;" target="_blank">点击查看详情!</a>';
        html2 += '<a href="#close" style="color:#EC641E; padding:0 10px" class="announce-colse">关闭</a></div>';
        var $el1 = $(html1);
        var $el2 = $(html2);

        $el2.find(".announce-colse").click(function () {
            $el1.remove();
            $el2.remove();
            Cookie.set(cookie_name, 1, 60 * 60 * 24);
            return false;
        });

        $(document.body).prepend($el1);
        $(document.body).append($el2);

    }

    if ((location.host == "www.hjenglish.com" ||
        location.host == "jp.hjenglish.com" ||
        location.host == "kr.hujiang.com" ||
        location.host == "fr.hujiang.com" ||

        location.host == "es.hujiang.com" ||
        location.host == "de.hujiang.com" ||
        location.host == "th.hujiang.com" ||
        location.host == "ru.hujiang.com" ||


        location.host == "xiaoxue.hujiang.com" ||
        location.host == "zhongxue.hujiang.com" ||
        location.host == "gaokao.hujiang.com" ||
        location.host == "yuer.hujiang.com"
        ) && location.pathname == "/" && (new Date()).valueOf() < (new Date('2016/2/21 22:00')).valueOf() && Cookie.get(cookie_name) == '' && (new Date()).valueOf() > (new Date('2016/2/20 12:00')).valueOf()) {
        init();
    }

})();


