// replace "toner" here with "terrain" or "watercolor"
var layer = new L.StamenTileLayer("terrain");
var map = new L.Map("map", {
});
latlng = new L.LatLng(map._container.dataset.lat, map._container.dataset.lng)
map.setView(latlng, 12)
map.addLayer(layer);
