/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
// GlucoDiary Namespace
var GlucoDiary = GlucoDiary || {};
var Highcharts;
var GDoptions = {
        chart: {
            renderTo: 'highcharts'
        },
        title: {
            text: 'Last 80 entries'
        },
        tooltip: {
            enabled: false
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
                type: 'spline',
                name: 'Carbs',
                //data: [6, 6, 5, 4, 10, 3, 7, 5, 3, 7],
                data: [],
                color: '#8cc152',
//                lineColor: '#8cc152',
//                fillOpacity: 0.5,
                animation: false
            },
            {
                type: 'line',
                name: 'Insulin',
                data: [],
//                data: [5, 4, 10, 3, 7, 5, 3, 7, 4, 8],
                color: '#3bafda',
//                lineColor: '#3bafda',
//                fillOpacity: 0.3,
                animation: false
            }
                ]
    };

GlucoDiary.HighChart = function () {
    GlucoDiary.ReadGlucoseReading();
    var chart = new Highcharts.Chart(GDoptions);
};



///// INIT /////
window.onload = function () {
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
        alert('record carbs');
    };
    document.getElementById("GDinsulin").onclick = function () {
        alert('record insulin');
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
       // alert(document.getElementById("glucoseUnits").value === "0");
        if ((document.getElementById("glucoseUnits").value === "") || (document.getElementById("glucoseUnits").value === "0")) {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();
        } else {
            d = new Date();
            dFormatted = [d.getFullYear(), ("0" + d.getMonth()).slice(-2), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getUTCHours()).slice(-2), ("0" + d.getUTCMinutes()).slice(-2), ("0" + d.getUTCSeconds()).slice(-2)].join("");
            localStorage["gluco_" + dFormatted] = parseInt(document.getElementById("glucoseUnits").value, 10);
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


//////  Iterating Keys in the Local Storage

GlucoDiary.ReadGlucoseReading = function () {
    var i, propertyName, glucoseString;
    glucoseString = [];
    document.getElementById("dataStatusMessage").innerHTML = "getting data ...<br />";
    for (i = 0; i < localStorage.length; i++) {
        propertyName = localStorage.key(i);
        glucoseString.push(localStorage.getItem(propertyName));
        //document.getElementById("dataStatusMessage").innerHTML += (i + " : " + propertyName + " = " + localStorage.getItem(propertyName) + "<br />");
    }
    GDoptions.series[0].data = JSON.parse("[" + glucoseString + "]");
    document.getElementById("dataStatusMessage").innerHTML = "data loaded";
};
