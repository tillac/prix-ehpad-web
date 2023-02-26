var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // style URL
    // or Maptiler
    zoom: 5,
    center: [2.19, 46.6]
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');
map.addControl(new maplibregl.FullscreenControl(), 'top-right');
map.setMaxZoom(13.8)

map.on('load', () => {

    // departements
    map.addSource('departements', {
        type: 'geojson',
        data: 'data/prix_ehpad_dep.geojson'
    });
    // en invisible
    map.addLayer({
        'id': 'fond_departements',
        'type': 'fill',
        'source': 'departements',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
        },
        // size by zoom
        'paint': {
            // autre option : styler la carte de base
            'fill-color': 'transparent',
            'fill-opacity': 0.8,
            'fill-outline-color': '#ffc273'
        },
        'minzoom': 0,
        'maxzoom': 14
    });

    // en invisible pour obtenir l'ID au click
    // avec un filter
    map.addLayer({
        'id': 'fond_filtre_departements',
        'type': 'fill',
        'source': 'departements',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
        },
        // size by zoom
        'paint': {
            // autre option : styler la carte de base
            'fill-color': '#ffc273',
            'fill-opacity': 0.8,
        },
        'filter': ['in', 'code_dep', ''],
        'minzoom': 0,
        'maxzoom': 14
    });

    // ehpad
    map.addSource('ehpad', {
        type: 'geojson',
        data: 'data/prix_ehpad.geojson'
    });
    map.addLayer({
        'id': 'prix-ehpad',
        'type': 'circle',
        'source': 'ehpad',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
        },
        // size by zoom
        'paint': {
            'circle-radius': {
                'base': 6,
                'stops': [
                    [4, 2],
                    [6, 4],
                    [8, 6],
                    [10, 8],
                    [12, 10],
                    [14, 12]
                ]
            },
            'circle-color': ['get', 'prixHebPermCs_d_col'],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1
        },
        'minzoom': 4,
        'maxzoom': 14
    });
});

// Cursor
map.on('mouseenter', 'prix-ehpad', () => {
    map.getCanvas().style.cursor = 'pointer'
})
map.on('mouseleave', 'prix-ehpad', () => {
    map.getCanvas().style.cursor = ''
})

// Popup
map.on('click', 'prix-ehpad', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.popup;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});


