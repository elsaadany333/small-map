import { el, loadJSON } from "./lib.js";
let map;
let iconsVisible = false;

export function showMap() {
  //console.log(L);

  map = L.map("map").setView([52.4753, 13.4207], 8);
  //"http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    zoom: { maxZoom: 19 },
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  // marker icon
  let carIcon = L.icon({
    iconUrl : "fotos/car.png",
      iconSize : [35,35]

  })
  //marker
  let marker = L.marker([52.4753, 13.4207],{icon: carIcon}).addTo(map);

  //map click event
  map.on("click", function (e) {
    let secoundMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(52.4753, 13.4207), 
        L.latLng(e.latlng.lat, e.latlng.lng)
      ],
    }).on('routesfound', function(e){
      console.log(e)
      e.routes[0].coordinates.forEach(function(coord , index){
        setTimeout(() => {
          marker.setLatLng([coord.lat, coord.lng])
        }, 100 * index)
      })
    }).addTo(map);


  });

  /*   L.Routing.control({
    waypoints: [
      L.latLng(52.47, 13.42),
      L.latLng(52.4753, 13.4207)
    ]
  }).addTo(map);  */
}

export async function showRestaurant() {
  const data = await loadJSON("data/restaurants_berlin.json");
  data.forEach((obj) => {
    const pos = [obj.latitude, obj.longitude];
    const customIcon = L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div style="background-color: red; padding: 8px; border-radius: 50%; display: inline-block;">
            <i class="fa-solid fa-utensils" style="color: white; font-size: 36px;"></i>
        </div>`,
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -64],
    });

    const content = `
        <h5>Rastaurant: ${obj.name}</5>
        <h5>Adresse: ${obj.addresse}</5>
        <h5>Bezirk: ${obj.bezirk}</5>
        <img src="${obj.image}" alt="${obj.name}" style="max-width: 100%; max-height: 100%;">
        `;

    L.marker(pos, {
      icon: customIcon,
    })
      .bindPopup(content)
      .addTo(map);
  });
  iconsVisible = true;
}

export async function showAirport() {
  const data = await loadJSON("data/berlin_airport.json");
  data.forEach((obj) => {
    const pos = [obj.latitude, obj.longitude];
    const customIcon = L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div style="background-color: white; padding: 8px; border-radius: 50%; display: inline-block; font-size: 20px;">
        <i class="fa-solid fa-plane-departure"></i>
        </div>`,
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -64],
    });

    const content = `
        <h5>${obj.name}</5>
        <h5>Adresse: ${obj.addresse}</5>
        <h5>Bezirk: ${obj.bezirk}</5>
        <img src="${obj.image}" alt="${obj.name}" style="max-width: 100%; max-height: 100%;">
        `;

    L.marker(pos, {
      icon: customIcon,
    })
      .bindPopup(content)
      .addTo(map);
  });
}

export async function showUbahn() {
  const data = await loadJSON("data/ubahn.json");
  data.forEach((obj) => {
    const pos = [obj.latitude, obj.longitude];
    const customIcon = L.divIcon({
      className: "custom-marker-icon",
      html: `
      <div style="background-color: white; padding: 8px; border-radius: 50%; display: inline-block; font-size: 20px;">
      <i class="fa-solid fa-train-subway" style="color: #74C0FC;"></i>
        </div>
      `,
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -64],
    });
    //<img src="./fotos/u-icon.png" width="15"  alt="">
    const content = `
      <h5>${obj.name}</5>
      <h5>Adresse: ${obj.addresse}</5>
      <h5>Bezirk: ${obj.bezirk}</5>
      <img src="${obj.image}" alt="${obj.name}" style="max-width: 100%; max-height: 100%;">
      `;

    L.marker(pos, {
      icon: customIcon,
    })
      .bindPopup(content)
      .addTo(map);
  });
}

export async function showHotels() {
  const data = await loadJSON("data/hotels.json");
  data.forEach((obj) => {
    const pos = [obj.latitude, obj.longitude];
    const customIcon = L.divIcon({
      className: "custom-marker-icon",
      html: `
      <div style="background-color: white; padding: 8px; border-radius: 50%; display: inline-block; font-size: 20px;">
      <i class="fa-solid fa-bed"></i>
      </div>`,
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -64],
    });

    const content = `
      <h5>${obj.name}</5>
      <h5>Adresse: ${obj.addresse}</5>
      <h5>Bezirk: ${obj.bezirk}</5>
      <img src="${obj.image}" alt="${obj.name}" style="max-width: 100%; max-height: 100%;">
      `;

    L.marker(pos, {
      icon: customIcon,
    })
      .bindPopup(content)
      .addTo(map);
  });
}

//el('restaurant-link').addEventListener('click', showAirBnBData);

/*         L.circle(pos,{
            fillColor:'blue',
            radius:100
        }).bindPopup(content).addTo(map) */
