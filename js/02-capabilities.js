/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
/*global GlucoDiary, document */

GlucoDiary.CheckSupportsStorage = function () {
    //Check if localStorage is supported:
    if (window.localStorage) {
        document.getElementById("infomessage").innerHTML += "Local Storage is available for use<br />";
        return true;
    } else {
        return false;
    }
};

GlucoDiary.CheckIfOnline = function () {
    //Check if app is online
    if (navigator.onLine) {
        document.getElementById("errormessage").innerHTML += "Online<br />";
    } else {
        document.getElementById("errormessage").innerHTML += "Offline<br />";
    }
};

GlucoDiary.CheckSupportsAppCache = function () {
    //Check if offline application cache is supported:
    if (window.applicationCache) {
        document.getElementById("infomessage").innerHTML += "Application Cache is available for use<br />";
        return true;
    } else {
        return false;
    }
};
