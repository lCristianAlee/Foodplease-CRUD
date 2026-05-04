# ADR-003: Uso de Jazzmin como panel administrativo del CRUD

- **Estado:** Aceptado
- **Fecha:** 2026-05-04
- **Autores:** Equipo 4 (APTC106)

## Contexto

El público externo (clientes) sólo necesita lectura del menú. El equipo del local necesita crear, actualizar y borrar productos con seguridad (autenticación, permisos, CSRF, validaciones). La rúbrica exige CRUD funcional, pero no obliga a construir formularios públicos.

## Opciones consideradas

1. **Django admin estándar** + tema personalizado vía CSS propio.
2. **Jazzmin** (tema sobre el admin estándar, configurable desde `settings.py`).
3. **Construir vistas CRUD propias** (CreateView, UpdateView, DeleteView) con autenticación manual.

## Decisión

Se adopta **`django-jazzmin`** como capa visual del admin, manteniendo la lógica nativa del `django.contrib.admin`.

## Rationale

- El admin nativo ya provee CRUD seguro: validación, CSRF, permisos por modelo, audit log básico (`LogEntry`). Reescribirlo sería romper el principio DRY.
- Jazzmin sólo cambia presentación; no introduce lógica de negocio. La separación SoC se mantiene.
- Construir vistas CRUD públicas duplicaría seguridad (permisos, CSRF, validaciones) que el admin ya resuelve, exponiendo un vector adicional sin beneficio para el cliente final.
- El cliente público continúa accediendo sólo a `ListView` y `DetailView` (sólo lectura) en `/menu/`.

## Consecuencias

- **Positivas:** mínima superficie de código propio, máxima seguridad heredada, branding alineado con la marca FoodPlease.
- **Negativas:** dependencia de un paquete externo; cambios mayores en Django podrían requerir actualizar Jazzmin.
- **Acción pendiente:** evaluar Django REST Framework cuando se construya la app móvil, exponiendo `Producto` como recurso `GET /api/productos/` consumible por los mockups.
