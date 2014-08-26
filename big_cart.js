/**
 * Created by Hank momane.com on 4/16/2014.
 */
chrome.storage.local.get(["kw", "kf", "shoeSize"], function (i) {
    var kw = i.kw;
    var kf = i.kf;
    var size = i.shoeSize;
    if (kf) {
        kw = kw.toString().replace(/\s+/g, ".*");
        kw = new RegExp(kw);
        $("p.item-wrapper").each(function () {
            var that = $(this);
            if (that.parent("li").css('display') != 'none') {
                if (kw.test(that.text().toLowerCase())) {
                    that.find("option").each(function () {
                        if ($(this).text() == size) {
                            console.log(that);
                            $(this).attr("selected", "selected");
                            $("#submit-table").click();
                            return false;
                        }
                    });
                }
            }
        });

    }
});
