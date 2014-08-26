/**
 * Created by Hank momane.com on 2/24/14.
 */
var tabs = chrome.tabs;
var ss = chrome.storage.local;
var bannerTid;

chrome.extension.onMessage.addListener(function (req, sender, sendResponse) {
    var m = req.m;
    if (m == "open") {
        tabs.create({url: req.url, active: false}, function (tab) {
            bannerTid = tab.id;
            ss.set({"bannerOpen": true, "lastTime": (new Date()).getDate()}, function () {
            });
        });

    }

});

tabs.onRemoved.addListener(function (tabId) {
    if (tabId == bannerTid) {
        ss.set({"bannerOpen": false}, function () {
        });
    }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-48748726-2']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();