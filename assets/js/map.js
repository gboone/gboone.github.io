var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var map = new L.Map("map", {
});
latlng = new L.LatLng(map._container.dataset.lat, map._container.dataset.lng)
map.setView(latlng, 12)
map.addLayer(Stamen_TonerLite);
