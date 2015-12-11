var Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var map = new L.Map("map", { scrollWheelZoom: false });
if ( _.contains(map._container.classList, 'no-markers') ) {
	var item = map._container.dataset
	setMarker(item)
	var latlng = setLatLng(item)
	if ( ! document.getElementById('locations') ) {
		map.setView(latlng)
		map.setZoom(12)
	}
}

if ( _.contains(map._container.classList, 'all-locations') ) {
	var locations = loadData('locations')
	setMarkers(locations)
	map.fitBounds(setBounds(locations))
}

if (_.contains(map._container.classList, 'post-with-markers')) {
	var locations = loadData('locations')
	var markers = loadData('map-data')
	if (markers.length === 1) {
		name = markers[0]
		setMarker(locations[name])
		map.setView(setLatLng(locations[name]))
		map.setZoom(12)
	} else {
		var reduced = []
		_.each(markers, function(item) {
			reduced.push(locations[item])
		})
		setMarkers(reduced)
		map.fitBounds(setBounds(reduced))
	}
}
map.addLayer(Toner);

function loadData(id) {
	return JSON.parse(document.getElementById(id).innerHTML);
}

function setLatLng(dataset) {
	var lat = dataset.lat
	var lng = dataset.lng
	return new L.LatLng(lat, lng)
}

function setMarker(item) {
	var latlng = setLatLng(item);
	L.marker(latlng, {
		clickable: true,
		title: item['name'],
		alt: "A marker indicating the location of " + item['name']
	}).addTo(map)
		.bindPopup(item['name']);
}
function setMarkers(markers) {
	_.each(markers, function(item) {
		setMarker(item)
	})
}

function setBounds(mapData) {
	var bounds = []
	_.each(mapData, function(item) {
			var latlng = setLatLng(item)
			bounds.push(latlng)
	})
	return bounds
}
