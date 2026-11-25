const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const availabilityForm = document.querySelector("#availability-form");
const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const formMessage = document.querySelector("#form-message");
const mapElement = document.querySelector("#saturnia-map");

document.querySelector("#current-year").textContent = new Date().getFullYear();

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10);
checkInInput.min = localToday;
checkOutInput.min = localToday;

checkInInput.addEventListener("change", () => {
  checkOutInput.min = checkInInput.value || localToday;
  if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
    checkOutInput.value = "";
  }
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Apri il menu" : "Chiudi il menu");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Apri il menu");
    siteNav.classList.remove("is-open");
  }
});

const properties = [
  {
    name: "Dimora dei Magi",
    address: "Via Aldobrandeschi, 10/A · Saturnia",
    coordinates: [42.665225, 11.504040],
    directions: "https://www.google.com/maps/search/?api=1&query=42.665225%2C11.504040",
  },
  {
    name: "Casetta dei Mauri",
    address: "Via degli Aldobrandeschi, 13 · Saturnia",
    coordinates: [42.6648048, 11.5046243],
    directions: "https://www.google.com/maps/search/?api=1&query=Via%20degli%20Aldobrandeschi%2013%2C%2058014%20Saturnia",
  },
  {
    name: "Camere dei Magi",
    address: "Via Italia, 3/A · Saturnia",
    coordinates: [42.664894, 11.506130],
    directions: "https://www.google.com/maps/search/?api=1&query=42.664894%2C11.506130",
  },
];

if (mapElement && window.L) {
  const map = L.map(mapElement, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  const markers = properties.map((property, index) => {
    const icon = L.divIcon({
      className: "",
      html: `<span class="maggi-map-pin"><span>${index + 1}</span></span>`,
      iconSize: [34, 42],
      iconAnchor: [17, 40],
      popupAnchor: [0, -38],
    });
    const marker = L.marker(property.coordinates, {
      icon,
      title: property.name,
      alt: property.name,
    }).addTo(map);
    marker.bindPopup(
      `<div class="map-popup"><strong>${property.name}</strong><span>${property.address}</span><br><a href="${property.directions}" target="_blank" rel="noreferrer">Indicazioni ↗</a></div>`,
    );
    return marker;
  });

  map.fitBounds(L.featureGroup(markers).getBounds().pad(0.25), { maxZoom: 17 });
} else if (mapElement) {
  console.error("La mappa di Saturnia non è stata caricata; verifica la connessione internet.");
}

availabilityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!availabilityForm.reportValidity()) return;

  if (checkOutInput.value <= checkInInput.value) {
    checkOutInput.setCustomValidity("La partenza deve essere successiva all'arrivo.");
    checkOutInput.reportValidity();
    checkOutInput.setCustomValidity("");
    return;
  }

  const formData = new FormData(availabilityForm);
  const message = [
    "Salve, vorrei verificare la disponibilità per un soggiorno.",
    `Arrivo: ${formData.get("checkin")}`,
    `Partenza: ${formData.get("checkout")}`,
    `Ospiti: ${formData.get("guests")}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/393482566392?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  formMessage.textContent = "WhatsApp si è aperto con la tua richiesta pronta da inviare.";
});
