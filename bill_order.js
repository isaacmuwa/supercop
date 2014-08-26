/**
 * Created by Hank momane.com on 4/18/2014.
 */
chrome.storage.local.get(["userInfo", "cl", "card"], function (item) {
    var userInfo = item.userInfo;
    if (userInfo != null) {
        console.log('...Billing Reached...');
        console.log("auto fill begin works");
//        info in common
        document.getElementById("checkout_email").value = userInfo.email;
        document.getElementById("checkout_shipping_address_name").value = userInfo.fname;
        document.getElementById("checkout_shipping_address_address1").value = userInfo.street;
        document.getElementById("checkout_shipping_address_address2").value = userInfo.street2;
        document.getElementById("checkout_shipping_address_city").value = userInfo.city;
        document.getElementById("checkout_shipping_address_zip").value = userInfo.zip;
        document.getElementById("checkout_shipping_address_country").value = userInfo.country;
        var event = document.createEvent("UIEvents");
        event.initUIEvent("change", true, true);
        document.getElementById("checkout_shipping_address_country").dispatchEvent(event);
        document.getElementById("checkout_shipping_address_phone").value = userInfo.tel;
        document.getElementById("checkout_shipping_address_province").value = userInfo.state;
        //document.getElementByName("commit").click();


        console.log('...Order Reached...');
//        info in common
        document.getElementById("checkout_discount_code").value = userInfo.dcode;
        document.getElementById("checkout_gift_card_code").value = userInfo.gift;
        /*
        $(document).unbind().bind("DOMNodeInserted", function (e) {
            console.log(e.target.id);
            if (e.target.id == "checkout_buyer_accepts_marketing") {
                fillcc();
            }
        });
        fillcc()*/


    } else {
        console.log("auto fill con not work");
    }




    if (item.cl) {
        if (item.card == "paypal") {
            document.getElementById("gateway-logos").children[0].click();
        } else {
           document.querySelectorAll("input.button.checkout")[0].click();
        }
    }
    $(document).unbind().bind("DOMNodeInserted", function (e) {
        console.log(e.target.id);
        if (e.target.id == "checkout_buyer_accepts_marketing") {
            fillcc();
        }
    });
    fillcc()

    function fillcc() {
        document.getElementById("checkout_credit_card_number").value = userInfo.c_num;
        document.getElementById("checkout_credit_card_name").value = userInfo.cc_name;
        document.getElementById("checkout_credit_card_expiry").value = userInfo.exp_month;
        document.getElementById("checkout_credit_card_verification_value").value = userInfo.cvv;
        document.getElementById("direct-payment").checked = true;
        if (item.cl) {
            //document.getElementByName("complete").click();
        }
    }

});
