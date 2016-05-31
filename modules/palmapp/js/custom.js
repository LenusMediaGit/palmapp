"use strict";

debugger;

jQuery.getScript("http://palmapp.lenuslab.com/web/palmapp/js/app-framework/scripts.js", function () {
    console.log("custom script loaded");
}).fail(function (jqxhr, settings, exception) {
    console.log(exception);
});

//# sourceURL=customPalmapp.js
