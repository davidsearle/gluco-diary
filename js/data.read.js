/*jslint browser: true, devel: true, sloppy: true, plusplus: true */
/*global GlucoDiary, document, GDoptions */

GlucoDiary.ReadLocalStorage = function () {
    var i, propertyName, insulinData, carbsData, glucoseData, bkgndData, dateString, dSFmt, dateTodayOffset, itemColor, itemNameString, dataOutputString;
    dataOutputString = "<table width=\"100%\" border=\"0\" style=\"border-collapse: collapse;\">";
    insulinData = [];
    carbsData = [];
    glucoseData = [];
    bkgndData = [];
    itemColor = "#CCC";
    dateTodayOffset = new Date();
    dateTodayOffset = Date.UTC(dateTodayOffset.getFullYear(), dateTodayOffset.getUTCMonth(), (dateTodayOffset.getDate() - 5), dateTodayOffset.getHours(), dateTodayOffset.getMinutes(), dateTodayOffset.getSeconds(), dateTodayOffset.getMilliseconds()).toString();
    dateTodayOffset = dateTodayOffset.substring(0, dateTodayOffset.length - 3);

    for (i = 0; i < localStorage.length; i++) {
        //document.getElementById("errormessage").innerHTML += "loop i = " + i + "<br />";
        
        dateString = Date.UTC(localStorage.key(i).substr(6, 4), localStorage.key(i).substr(10, 2), localStorage.key(i).substr(12, 2), localStorage.key(i).substr(15, 2), localStorage.key(i).substr(17, 2), localStorage.key(i).substr(19, 2)).toString();
        dateString = dateString.substring(0, dateString.length - 3);
        dSFmt = localStorage.key(i).substr(15, 2) + ":" + localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + " " + localStorage.key(i).substr(12, 2) + "/" + (parseInt(localStorage.key(i).substr(10, 2), 10) + 1) + "/" + localStorage.key(i).substr(6, 4);

        propertyName = localStorage.key(i);
        switch (propertyName.substring(0, 5)) {
        case "gluco":
            if (dateString > dateTodayOffset) {
                itemColor = "#DA4453";
                itemNameString = "Glucose";
                glucoseData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        case "carbs":
            if (dateString > dateTodayOffset) {
                itemColor = "#8CC152";
                itemNameString = "Carbs";
                carbsData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        case "bkgnd":
            if (dateString > dateTodayOffset) {
                itemNameString = "Bkgnd Insulin";
                itemColor = "#967ADC";
            }
            break;
        case "rapid":
            if (dateString > dateTodayOffset) {
                itemNameString = "Insulin";
                itemColor = "#3BAFDA";
                insulinData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        case "insul":
            dateString = Date.UTC(localStorage.key(i).substr(8, 4), localStorage.key(i).substr(12, 2), localStorage.key(i).substr(14, 2), localStorage.key(i).substr(17, 2), localStorage.key(i).substr(19, 2), localStorage.key(i).substr(21, 2)).toString();
            dateString = dateString.substring(0, dateString.length - 3);
            if (dateString > dateTodayOffset) {
                dSFmt = localStorage.key(i).substr(17, 2) + ":" + localStorage.key(i).substr(19, 2) + ":" + localStorage.key(i).substr(21, 2) + " " + localStorage.key(i).substr(14, 2) + "/" + (parseInt(localStorage.key(i).substr(12, 2), 10) + 1) + "/" + localStorage.key(i).substr(8, 4);
                itemNameString = "Insulin";
                itemColor = "#3BAFDA";
                insulinData.push("[" + [dateString + "000", localStorage.getItem(propertyName)] + "]");
            }
            break;
        default:
            return;
        }
        if (dateString > dateTodayOffset) {
            dataOutputString += "<tr style=\"border-top:solid 1px #EEE;\"><td style=\"border-left:solid 7px" + itemColor + ";\">" + itemNameString + " (" + i + ")</td><td>" + dSFmt + "</td><td>" + localStorage.getItem(propertyName) + "</td></tr>";
            dataOutputString += "<tr><td colspan=\"3\">&nbsp;</td></tr>";
        }
    }
    dataOutputString += "</table>";
    document.getElementById("dataStatusMessage").innerHTML = dataOutputString;
    GDoptions.series[0].data = JSON.parse("[" + glucoseData.sort() + "]");
    GDoptions.series[1].data = JSON.parse("[" + carbsData.sort() + "]");
    GDoptions.series[2].data = JSON.parse("[" + insulinData.sort() + "]");
};