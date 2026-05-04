# Mockups

Prototipos navegables de los tres frontends de FoodPlease.

## Carpetas

- `mobile-prototype/` — app móvil del cliente (iPhone 14, 7 pantallas: splash, login, menú, detalle, carrito, seguimiento, perfil).
- `driver-prototype/` — app móvil del repartidor (iPhone 14, 4 pantallas: login, pedido entrante, ruta activa, resumen del día).
- `web-prototype/` — web pública desktop (2 pantallas: home y detalle).

## Cómo abrirlos

Los HTML usan Babel-standalone, que requiere servirse por HTTP (no funciona abriéndolos con doble click por restricciones CORS del navegador).

Desde esta carpeta:

```powershell
cd docs/mockups
python -m http.server 8001
```

Luego abre en el navegador:

- http://localhost:8001/mobile-prototype/
- http://localhost:8001/driver-prototype/
- http://localhost:8001/web-prototype/

Para detener el servidor: `Ctrl+C`.

Los tres comparten paleta y tipografía: `#E63946`, fondo `#0F0F12`, Inter.
