/**
 * Created by Hank momane.com on 3/29/2014.
 */
var ss = chrome.storage.local;
var su = "http://kithnyc.com";
ss.get(["kw", "kf", "bannerOpen", 'lastTime'], function (i) {
    var kf = i.kf;
    var kw = i.kw;
    var bo = i.bannerOpen;
    kw = kw.toString().replace(/\s+/g, ".*");
    kw = new RegExp(kw);
    if (kf == true) {
        var find = false;
//        find = finder(".product-image>a", kw);

        $("div.caption").each(function(){
            var title = $(this).find("a").eq(0).attr("href");
            if (kw.test(title)){
                window.location = su + title;
                find = true;
            }
        });
        if (!find) {
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }

    }
});

