/**
 * Created by Hank momane.com on 4/17/2014.
 */

chrome.storage.local.get(["ci", "cl", "card"], function (i) {
    var card = i.card;
    if (i.cl) {
        if (card == "paypal") {
            $("input[name='goto_pp']").click();
        } else {
            var ck = $("div.totals").find("input[name='checkout']");
            var c = setInterval(function () {
                if (ck.attr("value") == "Check out") {
                    ck.click();
                    clearInterval(c);
                }
            }, 100);
        }
    }
});
