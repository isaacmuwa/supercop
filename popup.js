/**
 * Created by Tang on 14-3-4.
 */

$(document).ready(function () {
    if (localStorage.cl == "true") {
        $("#if_one_click").attr('checked', 'checked');
    } else {
        $("#if_one_click").removeAttr('checked');
    }
    if (localStorage.ac == "true") {
        $("#if_auto_cart").attr('checked', 'checked');
    } else {
        $("#if_auto_cart").removeAttr('checked');
    }
    if (localStorage.kf == "true") {
        $("#kfswitch").attr('checked', 'checked');
        $(".kware").show();
    } else {
        $("#kfswitch").removeAttr('checked');
        $(".kware").hide();
    }

    $("#shoes").val(localStorage.shoeSize);
    if(localStorage.kw){
        $("#keyword").val(localStorage.kw);
    }
    $("#sb").click(function () {
        var one_click = $("#if_one_click").is(":checked");
        var auto_cart = $("#if_auto_cart").is(":checked");
        var shoeSize = $("#shoes").val();
        var key_finder = $("#kfswitch").is(":checked");
        var kw = $("#keyword").val().trim();
        if (key_finder && kw == "") {
            alert("Please set the keyword");
        } else {
            localStorage.shoeSize = shoeSize;
            localStorage.cl = one_click;
            localStorage.ac = auto_cart;
            localStorage.kf = key_finder;
            localStorage.kw = kw.toLowerCase();
            chrome.storage.local.set({cl: one_click, ac: auto_cart,
                shoeSize: shoeSize, kw: kw.toLowerCase(),
                 kf: key_finder}, function () {
            });
            $(this).text("Saved!");
            setTimeout(function () {
                $("#sb").text("Save");
            }, 2000)
        }
    });

    $("#kfswitch").click(function () {
        if ($(this).is(":checked")) {
            $(".kware").slideDown(150);
        } else {
            $(".kware").slideUp(150);
        }

    });

});
