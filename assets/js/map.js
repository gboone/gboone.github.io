var Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var map = new L.Map("map", { scrollWheelZoom: false });
if ( map._container.dataset.lat && map._container.dataset.lng ) {
	var latlng = setLatLng(map._container.dataset)
	var zoom = 12
} else {
	var mapData = load_data()
	var bounds = []
	var markers = _.each(mapData, function(item) {
		var latlng = setLatLng(item);
		bounds.push(latlng);
		L.marker(latlng, {
			clickable: true,
			title: item['name'],
			alt: "A marker indicating the location of " + item['name']
		}).addTo(map)
			.bindPopup(item['name']);
	})
	bounds = new L.latLngBounds(bounds)
	map.fitBounds(bounds)
}
map.addLayer(Toner);

function load_data() {
	return JSON.parse(document.getElementById('map-data').innerHTML);
}

function setLatLng(dataset) {
	var lat = dataset.lat
	var lng = dataset.lng
	return new L.LatLng(lat, lng)
}
