/**
 * Created by Hank momane.com on 3/5/14.
 */

var href = window.location.href;
var storage = chrome.storage.local;
if (href.indexOf("checkout") == -1) {
    if (href.indexOf("products/") != -1 && href.indexOf("products/") != href.length - 4) {
        storage.get([ 'ac', "shoeSize"],
            function (i) {
                var has_size = false;
                var auto_cart = i.ac;
//                var one_click = i.cl;
                var shoeSize = i.shoeSize;
                $("#variant-listbox").find("option").each(function () {
                    if ($(this).text().replace(".0", "") == shoeSize) {
                        has_size = true;
                        $(this).attr("selected", "selected");
                        return false;
                    }
                });
                if (has_size && auto_cart) {
                    $(".cart-form").submit();
                }
            });
    }
}



