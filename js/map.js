// Init de la map
let mymap = L.map('mapid').setView([48.8590, 2.3470], 13);
let polyline;
let marker1;
let marker2;
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

    // On dessine le train représentant le trajet
    polyline = L.polyline(points, {color: "red"}).addTo(mymap);
    mymap.fitBounds(polyline.getBounds());

    // On ajoute un point pour chaque station visité
    marker1 = L.marker([stationStart.lat, stationStart.lng]).addTo(mymap);
    marker2 = L.marker([stationEnd.lat, stationEnd.lng]).addTo(mymap);


}

function clearItinerary() {
    mymap.removeLayer(polyline);
    mymap.removeLayer(marker1);
    mymap.removeLayer(marker2);
}

