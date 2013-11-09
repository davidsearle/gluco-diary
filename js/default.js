/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
var showDebug = true;

var GlucoDiary = GlucoDiary || {};

GlucoDiary.report = function (message, title) {
    if (showDebug) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
};

window.onload = function () {
    GlucoDiary.report("window.onload", "Info");
    if (GlucoDiary.CheckSupportsStorage() && GlucoDiary.CheckSupportsAppCache()) {
        GlucoDiary.CheckIfOnline();
        GlucoDiary.InitInteractionListeners();
        GlucoDiary.HighChart();
    } else {
        document.getElementById("errormessage").innerHTML = "Your Browser does not support local storage and offline web apps.<br />Please change/update your browser.";
    }
};