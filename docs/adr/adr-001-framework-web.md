# ADR-001: Adopción de Django como framework web

- **Estado:** Aceptado
- **Fecha:** 2026-05-04
- **Autores:** Equipo 4 (APTC106)

## Contexto

Se requiere construir un CRUD funcional para gestionar el menú de FoodPlease bajo una arquitectura por capas con separación clara entre modelo, vista y controlador. La entrega impone restricciones académicas (despliegue local, repositorio público en GitHub, mockups móviles) y de tiempo, por lo que se necesita un framework que entregue el mayor valor con la menor superficie de código propio.

## Opciones consideradas

1. **Django** (Python, MTV, baterías incluidas, ORM, panel admin, autenticación y CSRF integrados).
2. **Flask** (Python, microframework, mayor flexibilidad pero todo se construye desde cero).
3. **FastAPI** (Python, orientado a APIs, sin panel admin, plantillas no son su foco).
4. **Express** (Node.js, requeriría introducir un stack distinto al estudiado en clase).

## Decisión

Se adopta **Django 4.2 LTS**.

## Rationale

- El panel `django.contrib.admin` provee CRUD completo (crear, leer, actualizar, borrar) sin escribir vistas adicionales, cumpliendo el alcance mínimo de la rúbrica.
- Incluye protecciones OWASP por defecto: middleware CSRF, escape automático en templates, validadores de contraseña fuertes, ORM parametrizado (sin SQL inyectable).
- La arquitectura MTV de Django mapea de forma natural al patrón MVC exigido por el informe (Modelo = `models.py`, Controlador = `views.py`, Vista = `templates/`).
- LTS hasta abril de 2026, descartando deprecaciones a corto plazo.

## Consecuencias

- **Positivas:** menor código a mantener, seguridad por defecto, productividad alta, ecosistema maduro (Jazzmin, DRF a futuro).
- **Negativas:** acoplamiento al ORM y a las convenciones del framework. Migrar a otro stack a futuro implicaría reescribir capas.
- **Riesgos mitigados:** actualizaciones de seguridad cubiertas por la rama LTS.
