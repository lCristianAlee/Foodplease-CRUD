# ADR-002: Selección de SQLite como motor de base de datos

- **Estado:** Aceptado para entrega académica. Revisable al pasar a producción.
- **Fecha:** 2026-05-04
- **Autores:** Equipo 4 (APTC106)

## Contexto

El proyecto se evalúa con despliegue local en máquinas de los integrantes y del docente. La rúbrica exige funcionamiento mínimo viable y facilidad de clonado. La cantidad de datos prevista es baja (decenas de productos) y no hay concurrencia real.

## Opciones consideradas

1. **SQLite** (archivo único, embebido en Python, cero configuración).
2. **PostgreSQL** (cliente/servidor, robusto, requiere instalación y servicio).
3. **MySQL/MariaDB** (similar a PostgreSQL en costos de instalación).

## Decisión

Se adopta **SQLite** como motor de base de datos para esta etapa.

## Rationale

- Permite que cualquier evaluador clone el repositorio y ejecute `python manage.py migrate` sin instalar servicios adicionales.
- Django soporta SQLite como motor de primera clase.
- Volumen y concurrencia esperados son insignificantes para los límites de SQLite.
- Para producción real (multi-tenant, concurrencia, replicación) se migraría a PostgreSQL cambiando solo el bloque `DATABASES` de `settings.py`. La capa ORM aísla a la aplicación de esa decisión.

## Consecuencias

- **Positivas:** instalación trivial, portable como archivo, ideal para desarrollo y CI.
- **Negativas:** no apto para concurrencia alta ni cargas productivas.
- **Acción pendiente:** el archivo `db.sqlite3` está excluido del repositorio vía `.gitignore` (no debe versionarse).
