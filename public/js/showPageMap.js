const mapLocation = [-74.5, 40]
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: mapLocation, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(mapLocation)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                '<h3>${campground.title}</h3><p>${campground.location}</p>'
            )
    )
    .addTo(map)
