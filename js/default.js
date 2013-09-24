// GlucoDiary

function localstore() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.lastname === null) {
            localStorage.lastname = "default";
        }
        document.getElementById("result").innerHTML = "Last name: " + localStorage.lastname;
        if (localStorage.clickcount) {
            document.getElementById("result").innerHTML += "<br /><br /><br />You have clicked the button " + localStorage.clickcount + " time(s).";
        }
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function save() {
    if (typeof (Storage) !== "undefined") {
        if (document.getElementById("txtname").value === null) {
            localStorage.lastname = "defaultTxtBx";
        } else {
            localStorage.lastname = document.getElementById("txtname").value;
            document.getElementById("result").innerHTML = "Last name: " + localStorage.lastname;
        }
    } else {
        document.getElementById("result").innerHTML = "Cannot save :(";
    }


    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
        localStorage.clickcount = 1;
    }

    document.getElementById("result").innerHTML += "<br /><br /><br />You have clicked the button " + localStorage.clickcount + " time(s).";
}


function chart() {

    //Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart").getContext("2d");

    // data
    var data = {
        //labels: ["21 Sep 23:45", "22 Sep 09:45", "22 Sep 11:13", "22 Sep 14:56", "22 Sep 17:54", "22 Sep 23:19", "23 Sep 11:01", "21 Sep 23:45", "22 Sep 09:45", "22 Sep 11:13", "22 Sep 14:56", "22 Sep 17:54", "22 Sep 23:19", "23 Sep 11:01", "21 Sep 23:45", "22 Sep 09:45", "22 Sep 11:13", "22 Sep 14:56", "22 Sep 17:54", "22 Sep 23:19", "23 Sep 11:01", "21 Sep 23:45", "22 Sep 09:45", "22 Sep 11:13", "22 Sep 14:56", "22 Sep 17:54", "22 Sep 23:19", "23 Sep 11:01"],
        //labels: ["", "", "", "", "", "L", "a", "s", "t", "", "", "", "4", "0", "", "", "", "E", "n", "t", "r", "i", "e", "s", "", "", "", ""],
        labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2, 10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2, 10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2, 10.4, 17.2, 8.3, 13.4, 15.3, 10.5, 11.2]
            }
            //                ,

            //            {

            //                fillColor: "rgba(151,187,205,0.5)",

            //                strokeColor: "rgba(151,187,205,1)",

            //                pointColor: "rgba(151,187,205,1)",

            //                pointStrokeColor: "#fff",

            //                data: [28, 48, 40, 19, 96, 27, 100]

            //            }

        ]
    };

    //options
    var options = {
        animationSteps: 10,
        scaleFontSize: 9
    };

    //Line.defaults = {

    //    //Boolean - If we show the scale above the chart data
    //    scaleOverlay: false,

    //    //Boolean - If we want to override with a hard coded scale
    //    scaleOverride: false,

    //    //** Required if scaleOverride is true **
    //    //Number - The number of steps in a hard coded scale
    //    scaleSteps: null,
    //    //Number - The value jump in the hard coded scale
    //    scaleStepWidth: null,
    //    //Number - The scale starting value
    //    scaleStartValue: null,

    //    //String - Colour of the scale line
    //    scaleLineColor: "rgba(0,0,0,.1)",

    //    //Number - Pixel width of the scale line
    //    scaleLineWidth: 1,

    //    //Boolean - Whether to show labels on the scale
    //    scaleShowLabels: true,

    //    //Interpolated JS string - can access value
    //    scaleLabel: "<%=value%>",

    //    //String - Scale label font declaration for the scale label
    //    scaleFontFamily: "'Arial'",

    //    //Number - Scale label font size in pixels
    //    scaleFontSize: 12,

    //    //String - Scale label font weight style
    //    scaleFontStyle: "normal",

    //    //String - Scale label font colour
    //    scaleFontColor: "#666",

    //    ///Boolean - Whether grid lines are shown across the chart
    //    scaleShowGridLines: true,

    //    //String - Colour of the grid lines
    //    scaleGridLineColor: "rgba(0,0,0,.05)",

    //    //Number - Width of the grid lines
    //    scaleGridLineWidth: 1,

    //    //Boolean - Whether the line is curved between points
    //    bezierCurve: true,

    //    //Boolean - Whether to show a dot for each point
    //    pointDot: true,

    //    //Number - Radius of each point dot in pixels
    //    pointDotRadius: 3,

    //    //Number - Pixel width of point dot stroke
    //    pointDotStrokeWidth: 1,

    //    //Boolean - Whether to show a stroke for datasets
    //    datasetStroke: true,

    //    //Number - Pixel width of dataset stroke
    //    datasetStrokeWidth: 2,

    //    //Boolean - Whether to fill the dataset with a colour
    //    datasetFill: true,

    //    //Boolean - Whether to animate the chart
    //    animation: true,

    //    //Number - Number of animation steps
    //    animationSteps: 60,

    //    //String - Animation easing effect
    //    animationEasing: "easeOutQuart",

    //    //Function - Fires when the animation is complete
    //    onAnimationComplete: null

    //}


    // init chart
    var myNewChart = new Chart(ctx).Line(data, options);
    //new Chart(ctx).Line(data, options);

}



//if (typeof window.innerWidth != 'undefined') {
//                viewportwidth = window.innerWidth;
//                viewportheight = window.innerHeight;
//    alert(viewportwidth)
//            }
