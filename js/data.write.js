/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
/*global GlucoDiary, document */

//localStorage.clear();

GlucoDiary.SaveGlucoseReading = function () {
    if (typeof (Storage) !== "undefined") {
        var d, dFormatted;
        if ((document.getElementById("glucoseUnits").value === "") || (document.getElementById("glucoseUnits").value === "0")) {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();
        } else {
            d = new Date();
            dFormatted = [d.getFullYear(), ("0" + d.getMonth()).slice(-2), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join("");
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
            localStorage["rapid_" + dFormatted] = parseFloat(document.getElementById("insulinUnits").value);
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
GlucoDiary.SaveBkgndReading = function () {
    if (typeof (Storage) !== "undefined") {
        var d, dFormatted;
        if ((document.getElementById("bkgndUnits").value === "") || (document.getElementById("bkgndUnits").value === "0")) {
            document.getElementById("errormessage").innerHTML = "Please select a value before clicking SAVE";
            document.getElementById("errormessage").scrollIntoView();
        } else {
            d = new Date();
            dFormatted = [d.getFullYear(), ("0" + d.getMonth()).slice(-2), ("0" + d.getDate()).slice(-2), "_", ("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join("");
            localStorage["bkgnd_" + dFormatted] = parseFloat(document.getElementById("bkgndUnits").value);
            document.getElementById("bkgndUnits").value = "0";
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