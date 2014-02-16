/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
/*global GlucoDiary, document */

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
        text: 'Last 5 Days'
    },
    tooltip: {
        enabled: false
    },
    xAxis: {
        type: 'datetime',
        title: ''
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
            color: '#8CC152',
            animation: false
        },
        {
            type: 'line',
            name: 'Rapid Insulin',
            data: [],
            color: '#3BAFDA',
            animation: false
        }
        ]
};

GlucoDiary.HighChart = function () {
    GlucoDiary.ReadLocalStorage();
    chart = new Highcharts.Chart(GDoptions);
};
