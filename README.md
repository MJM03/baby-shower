# Baby Shower 💙

Invitación digital + lista de regalos + RSVP, pensada para publicarse gratis con GitHub Pages.

## Incluye

- Portada responsive estilo app
- Cuenta regresiva
- Fecha, hora, lugar y enlace a Maps
- Lista de regalos por categorías
- Filtro por rango de precio
- Reserva de regalos para evitar duplicados
- Aportes para regalos grandes
- Confirmación de asistencia (RSVP)
- Persistencia local inmediata
- Integración preparada para Firebase/Firestore

## Personalización rápida

Edita `APP_CONFIG` al inicio de `app.js`:

```js
const APP_CONFIG = {
  babyName: "Nuestro bebé",
  eventDate: "2026-10-10",
  eventTime: "16:00",
  eventPlace: "Tu dirección o local",
  mapsUrl: "https://maps.google.com/...",
  firebase: null
};
```

Mientras `firebase` esté en `null`, la web funciona en modo local: las reservas y confirmaciones se guardan solo en el dispositivo del visitante.

## Sincronización entre todos los invitados

Para que una reserva hecha desde un teléfono aparezca inmediatamente como reservada en los demás, crea un proyecto gratuito de Firebase, habilita Firestore y reemplaza `firebase: null` con la configuración web del proyecto.

Las colecciones usadas por la app son:

- `giftReservations`
- `giftContributions`
- `rsvp`

## Publicar con GitHub Pages

En el repositorio entra a **Settings → Pages**, selecciona **Deploy from a branch**, usa la rama `main` y la carpeta `/ (root)`, y guarda.

La URL esperada será:

`https://mjm03.github.io/baby-shower/`

---

Hecho con 💙 para celebrar la llegada del bebé.
