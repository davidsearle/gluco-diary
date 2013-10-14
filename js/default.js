/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
///// INIT GlucoDiary Namespace and chart options /////
var GlucoDiary = GlucoDiary || {};
var Highcharts, chart;
var GDoptions = {
    chart: {
        renderTo: 'highcharts',
        height: 300,
        width: 320
    },
    global: {
        useUTC: false
    },
    title: {
        text: 'Last 4 Days'
    },
    tooltip: {
        enabled: false
    },
    xAxis: {
        type: 'datetime',
        title: '' //,
        //            dateTimeLabelFormats: { // don't display the dummy year
        //                month: '%e. %b',
        //                year: '%b'
        //            }
    },
    yAxis: {
        title: ''
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        states: {
            hover: {
                enabled: false
            }
        },
        type: 'areaspline',
        name: 'Glucose',
        data: [],
        color: '#DA4453',
        lineColor: '#DA4453',
        fillOpacity: 0.3,
        animation: false
    },
        {
            type: 'column',
            name: 'Carbs',
            data: [],
            //data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            color: '#8cc152',
            animation: false
        },
        {
            type: 'spline',
            name: 'Rapid Insulin',
            data: [],
            //data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
            color: '#3bafda',
            animation: false
        }
        ]
};

GlucoDiary.HighChart = function () {
    GlucoDiary.ReadLocalStorage();
    chart = new Highcharts.Chart(GDoptions);
};


///// INIT /////
window.onload = function () {
    //localStorage.clear();
    if (GlucoDiary.CheckSupportsStorage() && GlucoDiary.CheckSupportsAppCache()) {
        GlucoDiary.CheckIfOnline();
        GlucoDiary.InitInteractionListeners();
        GlucoDiary.HighChart();
    } else {
        document.getElementById("errormessage").innerHTML = "Your Browser does not support local storage and offline web apps.<br />Please change/update your browser.";
    }
};



/////////   EVENT LISTENERS    ////////
GlucoDiary.InitInteractionListeners = function () {
    document.getElementById("GDcarbs").onclick = function () {
        document.getElementById("inputCarbsReading").scrollIntoView();
        document.getElementById("carbsUnits").focus();
        document.getElementById("carbsUnits").select();
    };
    document.getElementById("carbsUnits").onclick = function () {
        this.select();
    };
    document.getElementById("carbsUnits").onkeydown = function (e) {
        if (e.keyCode === 13) {
            GlucoDiary.SaveCarbsReading();
        }
    };
    document.getElementById("GDinsulin").onclick = function () {
        document.getElementById("inputInsulinReading").scrollIntoView();
        document.getElementById("insulinUnits").focus();
        document.getElementById("insulinUnits").select();
    };
    document.getElementById("insulinUnits").onclick = function () {
        this.select();
    };
    document.getElementById("insulinUnits").onkeydown = function (e) {
        if (e.keyCode === 13) {
            GlucoDiary.SaveInsulinReading();
        }
    };
    document.getElementById("GDglucose").onclick = function () {
        document.getElementById("inputGlucoseReading").scrollIntoView();
        document.getElementById("glucoseUnits").focus();
        document.getElementById("glucoseUnits").select();
    };
    document.getElementById("glucoseUnits").onclick = function () {
        this.select();
    };
    document.getElementById("glucoseUnits").onkeydown = function (e) {
        if (e.keyCode === 13) {
            GlucoDiary.SaveGlucoseReading();
        }
    };
};

/////////   CAPABILITIES     //////////
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


////////  FUNCTIONS   /////////////
GlucoDiary.SaveGlucoseReading = function () {
    if (typeof (Storage) !== "undefined") {
        var d, dFormatted;
        if ((document.getElementById("glucoseUnits").value === "") || (document.getElementById("glucoseUnits").value === "0")) {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();
        } else {
            d = new Date();
            dFormatted = [d.getFullYear(), ("0" + d.getMonth().slice(-2)), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join("");
            localStorage["gluco_" + dFormatted] = parseFloat(document.getElementById("glucoseUnits").value);
            document.getElementById("glucoseUnits").value = "0";
            document.getElementById("errormessage").innerHTML = "";
            document.getElementById("infomessage").innerHTML = "Data Saved";
            document.getElementById("container").scrollIntoView();
            GlucoDiary.HighChart();
        }
    } else {
        document.getElementById("errormessage").innerHTML += "Cannot save :(<br />";
        document.getElementById("errormessage").scrollIntoView();
    }
};
GlucoDiary.SaveCarbsReading = function () {
    if (typeof (Storage) !== "undefined") {
        var d, dFormatted;
        if ((document.getElementById("carbsUnits").value === "") || (document.getElementById("carbsUnits").value === "0")) {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();
        } else {
            d = new Date();
            dFormatted = [d.getFullYear(), ("0" + d.getMonth()).slice(-2), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join("");
            localStorage["carbs_" + dFormatted] = parseFloat(document.getElementById("carbsUnits").value);
            document.getElementById("carbsUnits").value = "0";
            document.getElementById("errormessage").innerHTML = "";
            document.getElementById("infomessage").innerHTML = "Data Saved";
            document.getElementById("container").scrollIntoView();
            GlucoDiary.HighChart();
        }
    } else {
        document.getElementById("errormessage").innerHTML += "Cannot save :(<br />";
        document.getElementById("errormessage").scrollIntoView();
    }
};
GlucoDiary.SaveInsulinReading = function () {
    if (typeof (Storage) !== "undefined") {
        var d, dFormatted;
        if ((document.getElementById("insulinUnits").value === "") || (document.getElementById("insulinUnits").value === "0")) {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();
        } else {
            d = new Date();
            dFormatted = [d.getFullYear(), ("0" + d.getMonth()).slice(-2), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join("");
            localStorage["insulin_" + dFormatted] = parseFloat(document.getElementById("insulinUnits").value);
            document.getElementById("insulinUnits").value = "0";
            document.getElementById("errormessage").innerHTML = "";
            document.getElementById("infomessage").innerHTML = "Data Saved";
            document.getElementById("container").scrollIntoView();
            GlucoDiary.HighChart();
        }
    } else {
        document.getElementById("errormessage").innerHTML += "Cannot save :(<br />";
        document.getElementById("errormessage").scrollIntoView();
    }
};

//GlucoDiary.ReadGlucoseReading = function () {
//    var i, propertyName, glucoseString, dtString;
//    glucoseString = [];
//    for (i = 0; i < localStorage.length; i++) {
//        propertyName = localStorage.key(i);
//        if (localStorage.key(i).indexOf("gluco_") !== -1) {
//            dtString = Date.UTC(localStorage.key(i).substr(6, 4) + "/" + localStorage.key(i).substr(10, 2) + "/" + localStorage.key(i).substr(12, 2) + " " + localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2));
//            glucoseString.push("[" + [dtString, localStorage.getItem(propertyName)] + "]");
//            document.getElementById("dataStatusMessage").innerHTML += "Gluc " +  dtString + "<br />" + new Date(dtString).toString() + " <br /> " + localStorage.key(i).substr(6, 4) + "/" + localStorage.key(i).substr(10, 2) + "/" + localStorage.key(i).substr(12, 2) + " " + localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + "<br />::--- " + localStorage.getItem(propertyName) + "<br />";
//        }
//    }
//    GDoptions.series[0].data = JSON.parse("[" + glucoseString + "]");
//};
//
//GlucoDiary.ReadCarbsReading = function () {
//    var i, propertyName, carbsString, dtString;
//    carbsString = [];
//    for (i = 0; i < localStorage.length; i++) {
//        propertyName = localStorage.key(i);
//        if (localStorage.key(i).indexOf("carbs_") !== -1) {
//            if (isNaN(Date.UTC(localStorage.key(i).substr(6, 4) + "/" + localStorage.key(i).substr(10, 2) + "/" + localStorage.key(i).substr(12, 2) + " " + localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2)))) {
//                dtString = Date.UTC(localStorage.key(i).substr(6, 4) + "/" + localStorage.key(i).substr(12, 2) + "/" + localStorage.key(i).substr(10, 2) + " " + localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2));
//            } else {
//                dtString = Date.UTC(localStorage.key(i).substr(6, 4) + "/" + localStorage.key(i).substr(10, 2) + "/" + localStorage.key(i).substr(12, 2) + " " + localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2));
//            }
//            carbsString.push("[" + [dtString, localStorage.getItem(propertyName)] + "]");
//            document.getElementById("dataStatusMessage").innerHTML += "Carb " +  dtString + "<br />" + new Date(dtString).toString() + " <br /> " + localStorage.key(i).substr(6, 4) + "/" + localStorage.key(i).substr(10, 2) + "/" + localStorage.key(i).substr(12, 2) + " " + localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + "<br />::--- " + localStorage.getItem(propertyName) + "<br />";
//        }
//    }
//    GDoptions.series[1].data = JSON.parse("[" + carbsString + "]");
//};

//GlucoDiary.ReadInsulinReading = function () {
//    var i, propertyName, insulinString, dtString;
//    insulinString = [];
//    for (i = 0; i < localStorage.length; i++) {
//        propertyName = localStorage.key(i);
//        if (localStorage.key(i).indexOf("insulin_") !== -1) {
//            dtString = Date.UTC(localStorage.key(i).substr(8, 4) + "/" + localStorage.key(i).substr(12, 2) + "/" + localStorage.key(i).substr(14, 2) + " " + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + ":" + localStorage.key(i).substr(21, 2));
//            insulinString.push("[" + [dtString, localStorage.getItem(propertyName)] + "]");
//            document.getElementById("dataStatusMessage").innerHTML += "Insu " +  dtString + "<br />" + new Date(dtString).toString() + " <br /> " + localStorage.key(i).substr(8, 4) + "/" + localStorage.key(i).substr(12, 2) + "/" + localStorage.key(i).substr(14, 2) + " " + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + ":" + localStorage.key(i).substr(21, 2) + "<br />::--- " + localStorage.getItem(propertyName) + "<br />";
//        }
//    }
//    GDoptions.series[2].data = JSON.parse("[" + insulinString + "]");
//};


GlucoDiary.ReadLocalStorage = function () {
    document.getElementById("dataStatusMessage").innerHTML = "read local storage:<br /><br />";
    var i, propertyName, insulinData, carbsData, glucoseData, dateString, dSFmt, dateTodayOffset;
    insulinData = [];
    carbsData = [];
    glucoseData = [];
    dateTodayOffset = new Date();
    dateTodayOffset = Date.UTC(dateTodayOffset.getFullYear(), dateTodayOffset.getUTCMonth(), (dateTodayOffset.getDate() - 4), dateTodayOffset.getHours(), dateTodayOffset.getMinutes(), dateTodayOffset.getSeconds(), dateTodayOffset.getMilliseconds()).toString();
    dateTodayOffset =  dateTodayOffset.substring(0, dateTodayOffset.length - 3);

    for (i = 0; i < localStorage.length; i++) {
        dateString = Date.UTC(localStorage.key(i).substr(6, 4), localStorage.key(i).substr(10, 2), localStorage.key(i).substr(12, 2), localStorage.key(i).substr(15, 2), localStorage.key(i).substr(17, 2), localStorage.key(i).substr(19, 2)).toString();
        dateString = dateString.substring(0, dateString.length - 3);
        dSFmt = localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + " " + localStorage.key(i).substr(12, 2) + "/" + (parseInt(localStorage.key(i).substr(10, 2), 10) + 1) + "/" + localStorage.key(i).substr(6, 4);

        propertyName = localStorage.key(i);
        switch (propertyName.substring(0, 5)) {
        case "gluco":
            if (dateString > dateTodayOffset) {
                glucoseData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        case "carbs":
            if (dateString > dateTodayOffset) {
                carbsData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        case "insul":
            dateString = Date.UTC(localStorage.key(i).substr(8, 4), localStorage.key(i).substr(12, 2), localStorage.key(i).substr(14, 2), localStorage.key(i).substr(17, 2), localStorage.key(i).substr(19, 2), localStorage.key(i).substr(21, 2)).toString();
            dateString = dateString.substring(0, dateString.length - 3);
            dSFmt = localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + ":" + localStorage.key(i).substr(21, 2) + " " + localStorage.key(i).substr(14, 2) + "/" + (parseInt(localStorage.key(i).substr(12, 2), 10) + 1) + "/" + localStorage.key(i).substr(8, 4);
            if (dateString > dateTodayOffset) {
                insulinData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        default:
            return;
        }
        if (dateString > dateTodayOffset) {
            document.getElementById("dataStatusMessage").innerHTML += "<strong>date:</strong>" + dSFmt + "<br />value:" + localStorage.getItem(propertyName) + "<br /><br />";
        }
    }
    GDoptions.series[0].data = JSON.parse("[" + glucoseData.sort() + "]");
    GDoptions.series[1].data = JSON.parse("[" + carbsData.sort() + "]");
    GDoptions.series[2].data = JSON.parse("[" + insulinData.sort() + "]");
};
