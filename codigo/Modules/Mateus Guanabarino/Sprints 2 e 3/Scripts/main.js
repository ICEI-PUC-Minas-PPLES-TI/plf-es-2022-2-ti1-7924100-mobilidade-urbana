// Selecionar elementos DOM 
const mapDiv = document.querySelector('.map');
let coord = [-74.5, 40];
// Mapbox funcionalidade
function mapBoxFn (coord){ 
    let map = new mapboxgl.Map({
    container: mapDiv, // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: coord, // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
    // Popup
    let popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(coord)
    .setHTML('<h1>Voce esta aqui!</h1>')
    .addTo(map);
};
// mapBoxFn(coord);

// Achar Localizacao do usuario
function userLocation (){
    try{
    // Get position fn
    function position (c){
        console.log(c.coords);
        let lat = c.coords.latitude;
        let lng = c.coords.longitude;
        let coords = [lng, lat];
        // Mostrar localizacao no mapa 
        mapBoxFn(coords);
    };
    // Erro
    function error (err){
        alert(`ERROR(${err.code}): ${err.message}`);
    };

    // Navegador
     navigator.geolocation.getCurrentPosition(position, error);

    }catch(error){
        alert(error);
    }
};
userLocation();