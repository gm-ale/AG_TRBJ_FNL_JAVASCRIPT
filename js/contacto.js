let map, directionsService, directionsRenderer;

function initMap() {
  const businessLocation = { lat: 40.416775, lng: -3.703790 }; // Ejemplo: Madrid centro

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: businessLocation,
  });

  // Marcador del negocio
  new google.maps.Marker({
    position: businessLocation,
    map,
    title: "Atte Nails",
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Intentamos obtener ubicación cliente
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const clientLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        calculateAndDisplayRoute(clientLocation, businessLocation);
      },
      () => {
        alert("No se pudo obtener tu ubicación para calcular la ruta.");
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}

function calculateAndDisplayRoute(clientLocation, businessLocation) {
  directionsService.route(
    {
      origin: clientLocation,
      destination: businessLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        alert("Error al calcular la ruta: " + status);
      }
    }
  );
}
