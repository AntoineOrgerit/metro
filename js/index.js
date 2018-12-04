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
        console.log(graph.findShortestPath("Chatelet", 'Rambuteau'));

        if (data !== undefined) {
            var stations = dataReceived.graph;

            if (stations !== undefined) {

                for (var station in stations) {
                    if (stationsList[station] === undefined) {
                        stationsList[station] = {};
                        stationsList[station].etapes = stations[station];
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
    $("#dropdownDep .dropdownItem").click(function() {
        let element = $(this).children();
        $("#dropdownDepTitle").html(element.text());
    });

    //Tap sur le dropdown d'arrivee
    $("#dropdownArr .dropdownItem").click(function() {
        let element = $(this).children();
        $("#dropdownArrTitle").html(element.text());
    });
}
