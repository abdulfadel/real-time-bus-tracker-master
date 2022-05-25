mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJkdWxmZiIsImEiOiJjbDNreXFmNTIwNzR3M3BxdTltNG84YXZyIn0.bCdp8_oxCwJ6JeNBJ6X8iA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-71.101, 42.358], // starting position [lng, lat]
  zoom: 14, // starting zoom
});

var marker = new mapboxgl.Marker()
  .setLngLat([-71.092761, 42.357575])
  .addTo(map);

// Requesting bus data MBTA
async function run() {
  const locations = await getBusLocations();
  //console.log(new Date());
  //console.log(locations);
  let markerArr = [];
  markerArr.push(locations[0].attributes.longitude);
  markerArr.push(locations[0].attributes.latitude);
  marker.setLngLat(markerArr);
  console.log(markerArr);

  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

run();
