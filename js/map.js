// Init de la map
let mymap = L.map('mapid').setView([51.505, -0.09], 13);

// Ajout d'une tuile correspondant à la zone à afficher
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3pjdmRzZiIsImEiOiJjanA5bXpvaDcwOWgxM3JwaHAyMnQ4Zzh2In0.vZ1k6xTcQNRjaHD5qBftUw'
}).addTo(mymap);