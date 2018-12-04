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
                Object.keys(stations).sort().forEach(function(key) {
                    stationsList[key] = stations[key];
                });
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


function selectionIsCompleted(stationDep, stationArr) {
    let error = "";

    if (stationDep !== undefined && stationDep.startsWith("Station")) {
        error += "StationDep";
    }

    if (stationArr !== undefined && stationArr.startsWith("Station")) {
        error += "StationArr";
    }

    return error;
}

function loadItinerary() {
    // Récupération des stations concernées par le trajet (nom des stations
    let stationDepName = $("#dropdownDepTitle").text();
    let stationArrName = $("#dropdownArrTitle").text();

    let error = this.selectionIsCompleted(stationDepName, stationArrName);
    if (error === "") {
        // Récupération des objets correspondant à la station

        let stationStart = this.getStation(stationDepName);
        let stationEnd = this.getStation(stationArrName);
        this.addItineary(stationStart, stationEnd);

        let etapes = graph.findShortestPath(stationDepName, stationArrName);

        let stepListElement = $("#stepList");
        let liHtml = "";
        let tmp = "";

        if (etapes !== null) {
            for (var i = 0; i < etapes.length; i++) {
                if (i !== 0 && i !== etapes.length - 1) {
                    tmp = "<li style='list-style-type: circle'>" + etapes[i] + "</li>";
                    liHtml = liHtml + tmp;
                }

            }

            stepListElement.html(liHtml);

            if (etapes !== null) {
                $("#time").html(etapes.length * 2 - 2 + " min");
            }


            $("#result").css('display', "block");

        } else {
            let stack = "Impossible de charger l'itinéraire.";

            if (error === "StationDepStationArr") {
                stack += " Les stations sélectionnées sont incorrectes"
            } else if (error === "StationDep") {
                stack += " La station de départ est incorrecte";
            } else if (error === "StationArr") {
                stack += " La station de d'arrivée est incorrecte";
            }
            M.toast({html: stack});
        }

    }
}