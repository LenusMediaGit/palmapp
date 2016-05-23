appFramework.setMsgListener(function (e, data) {
    eval(data);
});

var origUrl = "http://palmapp.lenuslab.com/web/?version=1&platform=phonegap&phoneID=" + device.uuid + "&deviceplatform=" +device.platform;

if (!appFramework.getConf("url"))
    appFramework.setConf("url", origUrl);


// Depending on the device, a few examples are:
//   - "Android"
//   - "BlackBerry 10"
//   - "iOS"
//   - "WinCE"
//   - "Tizen"
var devicePlatform = device.platform;

if (PushNotification) {
	var push = PushNotification.init({
		android: {
			senderID: "993634988218"
		},
		ios: {
			alert: "true",
			badge: "true",
			sound: "true",
            senderID: "619337680774",
            gcmSandbox:"true"
		},
		windows: {}
	});

	push.on('registration', function (data) {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://www.palmapp.lenuslab.com/web/palmapp/register.php?pid=" + device.uuid + "&rid=" + data.registrationId  + "&deviceplatform=" +device.platform +"&version="+appFramework.getConf("version"),
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				console.log(data);
			},
			error: function (e) {
				console.log(e.message);
			}
		});
	});

	push.on('notification', function (data) {
		debugger; // enable debugger on this file

		var activity="",url="";
		if (devicePlatform.toLowerCase()==="ios") {
			activity=data.gcm.notification.activity;
			url=data.gcm.notification.activity;
		} else {
			activity=data.additionalData.activity;
			url=data.additionalData.activity;
		}
		
		if (activity == "app.palmapp.com.WebViewActivity") {
			if (jQuery("#app-iframe").length) {
				navigator.notification.confirm(
						data.message, // message
						function (buttonIndex) {
							if (buttonIndex === 1) {
								jQuery("#app-iframe").attr('src', url);
							}
						},
						data.title, // title
						['Vai', 'Chiudi']                  // buttonName
						);
			} else {
				appFramework.setConf("url", url);
			}
		}
	});

	push.on('error', function (e) {
		// e.message
	});
}

jQuery.getScript("http://palmapp.lenuslab.com/web/palmapp/js/app-framework/scripts.js", function () {
    loadRemoteApp();
}).fail(function (jqxhr, settings, exception) {
    console.log(exception);
});

function loadRemoteApp() {
    // run external app
    appFramework.loadExternal({

        onReady: function () {
            // restore original url ( can be changed by notifications )
            appFramework.setConf("url", origUrl);

            /*jQuery("#wrapper").css("background-image"," url('/android_asset/www/data/img/ajax-loader.gif')");
            jQuery("#wrapper").css("background-repeat","no-repeat");
            jQuery("#wrapper").css("background-attachment","fixed");
            jQuery("#wrapper").css("background-size","initial");
            jQuery("#wrapper").css("background-position","center");*/

            /*var iframe = jQuery("#iframe-wrapper");

             // just 2 tricks to make fading working on android:
             // 1) use css instead of jquery fade
             // 2) set a small timeout after iframe ready before "launche" the animation ( workaround )
             window.setTimeout(function () {
             iframe.addClass("fade-in");
             jQuery("#wrapper-table").remove();
             }, 500);
             */
        }
    });
}

//# sourceURL=customPalmapp.js
