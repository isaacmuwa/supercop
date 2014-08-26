/**
 * Created by Hank momane.com on 4/16/2014.
 */
/**
 * Created by Tang on 14-3-4.
 */
var storage = chrome.storage.local;
var USSTATE = '<option value="">-- Please Select --</option>' +
    '<option>Alabama</option><option>Alaska</option><option>American Samoa</option><option>Arizona</option>' +
    '<option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option>' +
    '<option>Delaware</option><option>Federated States of Micronesia</option><option>Florida</option>' +
    '<option>Georgia</option><option>Guam</option><option>Hawaii</option><option>Idaho</option>' +
    '<option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option>' +
    '<option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Marshall Islands</option>' +
    '<option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option>' +
    '<option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option>' +
    '<option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option>' +
    '<option>New York</option><option>North Carolina</option><option>North Dakota</option>' +
    '<option>Northern Mariana Islands</option><option>Ohio</option><option>Oklahoma</option>' +
    '<option>Oregon</option><option>Palau</option><option>Pennsylvania</option><option>Puerto Rico</option>' +
    '<option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option>' +
    '<option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option>' +
    '<option>Virginia</option><option>Washington</option><option>Washington DC</option>' +
    '<option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>' +
    '<option>Virgin Islands</option><option>Armed Forces Americas</option><option>Armed Forces Europe</option>' +
    '<option>Armed Forces Pacific</option>';
var CANADASTATE = '<option value="">-- Please Select --</option><option>Alberta</option>' +
    '<option>British Columbia</option><option>Manitoba</option><option>New Brunswick</option>' +
    '<option>Newfoundland</option><option>Northwest Territories</option><option>Nova Scotia</option>' +
    '<option>Nunavut</option><option>Ontario</option><option>Prince Edward Island</option>' +
    '<option>Quebec</option><option>Saskatchewan</option><option>Yukon</option>';

$(document).ready(function () {
    loadInfo();
    function saveInfo() {
        var userInfo = {};
        userInfo.fname = $("#fname").val();
        userInfo.lname = $("#lname").val();
        userInfo.email = $("#email").val();
        userInfo.tel = $("#tel").val();
        userInfo.company = $("#company").val();
        userInfo.street = $("#street").val();
        userInfo.street2 = $("#street2").val();
        userInfo.zip = $("#zip").val();
        userInfo.country = $("#country").val();
        userInfo.city = $("#city").val();
        userInfo.state = $("#state").val();
        userInfo.c_num = $("#c_num").val();
        userInfo.cc_name = $("#cc_name").val();
        userInfo.cvv = $("#cvv").val();
        var exp_month = $("#exp_month").val();
        if (parseInt(exp_month) != 10) {
            exp_month = exp_month.replace("0", "");
        }
        userInfo.exp_month = exp_month;
        userInfo.exp_year = $("#exp_year").val();
        userInfo.dcode = $("#dcode").val();
        userInfo.gift = $("#gift").val();
        localStorage["userInfo"] = JSON.stringify(userInfo);
        storage.set({"userInfo": userInfo}, function () {
        });

    }

    function loadInfo() {
        storage.get("userInfo", function (items) {
            var userInfo = items.userInfo;
            if (userInfo) {
                $("#clear").show();
                $("#fname").val(userInfo.fname);
                $("#lname").val(userInfo.lname);
                $("#email").val(userInfo.email);
                $("#company").val(userInfo.company);
                $("#tel").val(userInfo.tel);
                $("#street").val(userInfo.street);
                $("#street2").val(userInfo.street2);
                $("#zip").val(userInfo.zip);
                $("#city").val(userInfo.city);
                $("#country").val(userInfo.country);
                if (userInfo.country == "United States") {
                    $("#state").html(USSTATE);
                } else if (userInfo.country == "Canada") {
                    $("#state").html(CANADASTATE);
                }
                $("#state").val(userInfo.state);
                $("#c_num").val(userInfo.c_num);
                $("#cc_name").val(userInfo.cc_name);
                $("#cvv").val(userInfo.cvv);
                $("#exp_month").val(userInfo.exp_month);
                $("#exp_year").val(userInfo.exp_year);
                $("#dcode").val(userInfo.dcode);
                $("#gift").val(userInfo.gift);
            } else {
                $("#state").html(USSTATE);
            }
            if (localStorage.card == "credit") {
                $("#cardInfo").toggle("show");
                $("#credit").css("background-color", "red");
            } else {
                $("#pp").css("background-color", "red");
            }
        });
    }

    $(".card").each(function () {
        $(this).click(function () {
            $(".card").css("background-color", "white");
            $(this).css("background-color", "red");
            var card = $(this).attr("value");
            localStorage.card = card;
            if (card == "credit") {
                $("#cardInfo").toggle("show");
            } else {
                $("#cardInfo").toggle("hide");
            }
            chrome.storage.local.set({"card": card});
        });
    });
    $("#country").change(function () {
        if ($(this).val() == "United States") {
            $("#state").html(USSTATE);
        } else if ($(this).val() == "Canada") {
            $("#state").html(CANADASTATE);
        }
    });

    $("#sb").click(function () {
        saveInfo();
        $("#sb").text("Saved!");
        setTimeout(function(){
            $("#sb").text("Save Info");
        }, 3*1000);
    });

    $("#clear").click(function () {
        var clear = confirm("Are you sure to clear all the information?");
        if (clear) {
            localStorage.userInfo = "";
            localStorage.country = "";
            localStorage.card = "";
            storage.clear(function () {
            });
        }
    });

});