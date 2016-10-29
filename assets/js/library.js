var Ajax = function(type, _url, data, callBack){
	this.type = type;
	this._url = _url;
	this.data = data;
	this.submit = function(){
		$.ajax({
			type: type,
			url: _url,
			data: data,
			success: function(msg){
				msg = JSON.parse(msg);
                console.log(msg);
                if (callBack)
                callBack.action(msg);
			},
			error: function(msg){
				var error = {
					error_code: msg.status,
					message: msg.statusText
				};
				hideLoading();

				$("body").append(
				    '<div class="welcome-message-wrapper" style="padding-bottom: 10px;z-index:9001;background: rgba(191, 7, 7, 0.65);">'
				        +'<i class="fa fa-exclamation-triangle text-warning fa-2x"></i> Network error '+error.error_code+': please try again later.'
				    +'</div>'
				);

				$(".welcome-message-wrapper").delay(1000).fadeIn('slow',function(){
					setTimeout(function(){$(".welcome-message-wrapper").fadeOut('slow').delay(1000).remove();}, 5000);
				});

				removeSpinner();
			}
		});
	}
},
Login = function () {
    this.action = function (msg) {
        var $form = $("#login_form");
        if (msg.status) {
            window.location = msg.url;
            return;
        }
        removeSpinner($form.find("button"));
        errorAlert(msg.data, $form);
    }
};