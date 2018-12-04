$(".dropdown-trigger").dropdown();
loadStations();

let stationsList = {};

/**
 *
 */
function loadStations() {
    fetch("json/data.json").then(function (response) {
        return response.text();
    }).then(function (data) {
        if (data !== undefined) {
            var dataReceived = JSON.parse(data);
            var stations = dataReceived.ligne["11"];

            if (stations !== undefined) {
                stations = stations[0];

                for (var station in stations) {
                    if (stationsList[station] === undefined) {
                        stationsList[station] = {};
                        stationsList[station].etapes = stations[station];
                    }
                }
            }
        }
    });
}

