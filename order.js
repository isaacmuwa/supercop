/**
 * Created by Hank momane.com on 4/18/2014.
 */
chrome.storage.local.get(["userInfo", "cl", "card"], function (item) {
    var userInfo = item.userInfo;
    if (userInfo != null) {
        console.log('...Order Reached...');
//        info in common
        document.getElementById("checkout_discount_code").value = userInfo.dcode;
        document.getElementById("checkout_gift_card_code").value = userInfo.gift;
        $(document).unbind().bind("DOMNodeInserted", function (e) {
            console.log(e.target.id);
            if (e.target.id == "checkout_buyer_accepts_marketing") {
                fillcc();
            }
        });
        fillcc()
    } else {
        console.log("auto fill con not work");
    }

    function fillcc() {
        document.getElementById("checkout_credit_card_number").value = userInfo.c_num;
        document.getElementById("checkout_credit_card_name").value = userInfo.cc_name;
        document.getElementById("checkout_credit_card_expiry").value = userInfo.exp_month;
        document.getElementById("checkout_credit_card_verification_value").value = userInfo.cvv;
        document.getElementById("direct-payment").checked = true;
        if (item.cl) {
            document.getElementByName("complete").click();
        }
    }
});
