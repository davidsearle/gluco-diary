/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
/*global GlucoDiary, document */

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
    document.getElementById("GDbkgnd").onclick = function () {
        document.getElementById("inputBkgndReading").scrollIntoView();
        document.getElementById("bkgndUnits").focus();
        document.getElementById("bkgndUnits").select();
    };
    document.getElementById("bkgndUnits").onclick = function () {
        this.select();
    };
    document.getElementById("bkgndUnits").onkeydown = function (e) {
        if (e.keyCode === 13) {
            GlucoDiary.SaveBkgndReading();
        }
    };
};
