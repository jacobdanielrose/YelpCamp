const mapLocation = campground.geometry.coordinates
mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2Jyb3NlIiwiYSI6ImNraWFrZzZzNjAzdXMycmswYzExOGRyNmUifQ.x7FRktD6C81DF6LkefyRuQ';
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
                `<h4>${campground.title}</h4><p>${campground.location}</p>`
            )
    )
    .addTo(map)
