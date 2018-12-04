let stationsList = {};
let stationsLoadedEvent = new Event("stationsLoaded");
let graph;

$(document).ready(init);

function init() {
    //Ecouter événement
    document.addEventListener("stationsLoaded", loadDropdown);

    $(".dropdown-trigger").dropdown();
    loadStations();
    loadDropdown();
}

function getStation(stationName) {
    return stationsList[stationName];
}

/**
 *
 */
function loadStations() {
    fetch("json/data.json").then(function (response) {
        return response.text();
    }).then(function (data) {
        // init du graphe
        var dataReceived = JSON.parse(data);
        graph = new Graph(dataReceived);

        if (data !== undefined) {
            var stations = dataReceived.stations;

            if (stations !== undefined) {
                for (var station in stations) {
                    if (stationsList[station] === undefined) {
                        stationsList[station] = stations[station];
                    }
                }
            }
        }
        document.dispatchEvent(stationsLoadedEvent);
    });
}

function loadDropdown() {
    var ulHtml = "";
    var tmp = "";

    for (var station in stationsList) {
        tmp = "<li class='dropdownItem'><a href=\"#!\">" + station + "</a></li><li class=\"divider\" tabindex=\"-1\"></li>";
        ulHtml = ulHtml + tmp;
    }

    $("#dropdownDep").html(ulHtml);
    $("#dropdownArr").html(ulHtml);

    //Tap sur le dropdown de depart
    $("#dropdownDep .dropdownItem").click(function () {
        let element = $(this).children();
        let stationName = element.text();
        $("#dropdownDepTitle").html(stationName);
        $("#station_dep").html(stationName);
    });

    //Tap sur le dropdown d'arrivee
    $("#dropdownArr .dropdownItem").click(function () {
        let element = $(this).children();
        let stationName = element.text();
        $("#dropdownArrTitle").html(stationName);
        $("#station_arr").html(stationName);
    });
}

function loadItinerary() {
    // Récupération des stations concernées par le trajet (nom des stations
    let stationDepName = $("#dropdownDepTitle").text();
    let stationArrName = $("#dropdownArrTitle").text();

    if (stationDepName !== undefined && !stationDepName.startsWith("Station de") &&
        stationArrName !== undefined && !stationArrName.startsWith("Station de")) {
        // Récupération des objets correspondant à la station

        let stationStart = this.getStation(stationDepName);
        let stationEnd = this.getStation(stationArrName);
        this.addItineary(stationStart, stationEnd);
    }

    //Placer les etapes dans la section dédiées
}
