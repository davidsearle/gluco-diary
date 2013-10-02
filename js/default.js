/*jslint browser: true, devel: true, sloppy: true  */
// GlucoDiary Namespace
var GlucoDiary = GlucoDiary || {};
var Chartjsorg;
//GlucoDiary.Chart = function () {
//    //configure chart.js
//    document.getElementById("chartmessage").innerHTML = "Initialising chart..";
//    var ctx, data, options, myNewChart;
//    ctx = document.getElementById("myChart").getContext("2d");
//    data = {
//        labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//        datasets: [
//            {
//                //fillColor: "rgba(220,220,220,0.5)",
//                fillColor: "rgba(226,111,122,0.5)",
//                //strokeColor: "rgba(220,220,220,1)",
//                strokeColor: "rgba(196,39,55,0.5)",
//                pointColor: "rgba(196,39,55,0.5)",
//                pointStrokeColor: "#fff",
//                data: [10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2, 10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2, 10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2, 10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2]
//            }
//        ]
//    };
//    document.getElementById("chartmessage").innerHTML += "<br />data loaded...";
//    //options
//    options = {
//        animationSteps: 10,
//        scaleFontSize: 9
//    };
//    // init new chart
//    myNewChart = new Chartjsorg(ctx).Line(data, options);
//    document.getElementById("chartmessage").innerHTML += "<br />chart created (FINISHED)";
//};


GlucoDiary.HighChart = function () {
    var chart = new Highcharts.Chart({
        chart: {
            //            animation: {
            //                duration: 1000
            //            },
            renderTo: 'highcharts',
            type: 'areaspline'
        },

        //        xAxis: {
        //            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //        },
        //
        //        series: [
        //            {
        //                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        //            }]

        title: {
            text: 'Last 80 entries'
        },
        //        subtitle: {
        //            text: 'Irregular time data in Highcharts JS'
        //        },
        //        legend: {
        //                layout: 'vertical',
        //                align: 'left',
        //                verticalAlign: 'top',
        //                x: 150,
        //                y: 100,
        //                floating: true,
        //                borderWidth: 1,
        //                backgroundColor: '#FFFFFF'
        //            },
        xAxis: {
            //                type: 'datetime',
            //                categories: [
            //                    '',
            //                    '',
            //                    '',
            //                    '',
            //                    '',
            //                    '',
            //                    ''
            //                ],
            //                plotBands: [{ // visualize the weekend
            //                    from: 4.5,
            //                    to: 6.5,
            //                    color: 'rgba(68, 170, 213, .2)'
            //                }]
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        //        tooltip: {
        //            shared: true,
        //            valueSuffix: ' units'
        //        },
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
            animation: false,
            name: 'Glucose',
            data: [11.1, 14.3, 13.3, 25, 14, 10, 12, 9.1, 5.1, 2.1]
        }
                 //                     , {
                 //                name: 'Carbs',
                 //                data: [7, 5, 4, 6, 6, 5, 4, 10, 3, 7]
                 //            }, {
                 //                name: 'Rapid Insulin',
                 //                data: [6, 5, 4, 7, 6, 5, 4, 8, 2, 6]
                 //            }

            ]
    });
};



///// INIT /////
window.onload = function () {
    GlucoDiary.CheckSupportsStorage();
    GlucoDiary.CheckSupportsAppCache();
    GlucoDiary.CheckIfOnline();
    GlucoDiary.InitInteractionListeners();
    //GlucoDiary.Chart();
    GlucoDiary.HighChart();
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
    };
};

/////////   CAPABILITIES     //////////

GlucoDiary.CheckSupportsStorage = function () {
    //Check if localStorage is supported:
    if (window.localStorage) {
        document.getElementById("infomessage").innerHTML += "Local Storage is available for use<br />";
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
    }
};


////////  FUNCTIONS   /////////////

GlucoDiary.SaveGlucoseReading = function () {
    if (typeof (Storage) !== "undefined") {
        //get datetime
        var d, dFormatted;
        d = new Date();
        dFormatted = [d.getFullYear(), ("0" + d.getMonth()).slice(-2), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getUTCHours()).slice(-2), ("0" + d.getUTCMinutes()).slice(-2), ("0" + d.getUTCSeconds()).slice(-2)].join("");
        // check that values aren't all zeroes
        if (document.getElementById("glucoseTens").value === "0" && document.getElementById("glucoseUnits").value === "0" && document.getElementById("glucoseDecimal").value === "0") {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();

        } else {
            //
            if (document.getElementById("glucoseTens").value === "0") {
                //localStorage.lastname = document.getElementById("glucoseUnits").value + "." + document.getElementById("glucoseDecimal").value;
                localStorage["gluco_" + dFormatted] = document.getElementById("glucoseUnits").value + "." + document.getElementById("glucoseDecimal").value;
            } else {
                //localStorage.lastname = document.getElementById("glucoseTens").value + document.getElementById("glucoseUnits").value + "." + document.getElementById("glucoseDecimal").value;
                localStorage["gluco_" + dFormatted] = document.getElementById("glucoseTens").value + document.getElementById("glucoseUnits").value + "." + document.getElementById("glucoseDecimal").value;
            }
            document.getElementById("glucoseTens").value = "0";
            document.getElementById("glucoseUnits").value = "0";
            document.getElementById("glucoseDecimal").value = "0";
            document.getElementById("errormessage").innerHTML = "";
            document.getElementById("container").scrollIntoView();
        }
    } else {
        document.getElementById("errormessage").innerHTML += "Cannot save :(<br />";
        document.getElementById("errormessage").scrollIntoView();
    }
};
