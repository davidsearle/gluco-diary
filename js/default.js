/*jslint browser: true, devel: true, sloppy: true, plusplus: true */

var GlucoDiary = GlucoDiary || {};

window.onload = function () {
    if (GlucoDiary.CheckSupportsStorage() && GlucoDiary.CheckSupportsAppCache()) {
        GlucoDiary.CheckIfOnline();
        GlucoDiary.InitInteractionListeners();
        GlucoDiary.HighChart();
    } else {
        document.getElementById("errormessage").innerHTML = "Your Browser does not support local storage and offline web apps.<br />Please change/update your browser.";
    }
};