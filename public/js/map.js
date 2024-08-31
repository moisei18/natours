import L from 'leaflet';

export const displayMap = (locations) =>
  document.addEventListener('DOMContentLoaded', function () {
    // Инициализация карты
    const map = L.map('map', {
      scrollWheelZoom: false,
    }).setView([locations[0].coordinates[1], locations[0].coordinates[0]], 6);

    // Добавление слоя OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    locations.forEach((loc) => {
      if (Array.isArray(loc.coordinates)) {
        const [lng, lat] = loc.coordinates;

        const marker = L.marker([lat, lng]).addTo(map);

        marker
          .bindPopup(`<b>Day ${loc.day}: ${loc.description}</b>`, {
            autoClose: false,
            closeOnClick: false,
          })
          .openPopup(); // Opens popup by default
      } else {
        console.warn('Invalid coordinates:', loc.coordinates);
      }
    });
  });
