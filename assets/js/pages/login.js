/**
 * Created by adek on 10/29/16.
 */
$(document).ready(function () {
    $("#login_form").submit(function (e) {
        e.preventDefault();
        addSpinner($(this).find("button"));
        var type = "POST",
            _url = "/user",
            data = $(this).serialize(),
            callBack = new Login();
        var ajax = new Ajax(type, _url, data, callBack);
        callBack.action({
            status: false,
            data: "login error"
        });
    });
});