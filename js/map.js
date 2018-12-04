// Init de la map
let mymap = L.map('mapid').setView([51.505, -0.09], 13);
let polyline;
// let mymap = L.map('mapid');

// Ajout d'une tuile correspondant à la zone à afficher
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3pjdmRzZiIsImEiOiJjanA5bXpvaDcwOWgxM3JwaHAyMnQ4Zzh2In0.vZ1k6xTcQNRjaHD5qBftUw'
}).addTo(mymap);

function addItineary(stationStart, stationEnd) {
    if (polyline !== undefined) {
        clearItinerary();
    }

    let points = [
        [stationStart.lat, stationStart.lng],
        [stationEnd.lat, stationEnd.lng]
    ];

    polyline = L.polyline(points, {color: "red"}).addTo(mymap);
    mymap.fitBounds(polyline.getBounds());
}

function clearItinerary() {
    mymap.removeLayer(polyline);
}

