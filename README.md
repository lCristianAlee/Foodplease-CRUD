# FoodPlease CRUD

FoodPlease es un MVP web desarrollado con Django para gestionar el menú de un restaurante o servicio de delivery. El proyecto demuestra un backend simple con arquitectura por capas, un panel administrador para el local y una vista pública conectada a los datos.

## Alcance funcional del MVP

- CRUD de platos desde el panel de administración de Django.
- Menú público en `/menu/`.
- Ficha de detalle por plato.
- Disponibilidad visible para el cliente.
- Categorías funcionales con filtro por URL.
- Imagen opcional por URL, con placeholder automático cuando no se informa imagen.
- Redirección desde `/` hacia `/menu/` para facilitar la demo.
- Enlaces reales a mockups navegables de app cliente y app repartidor.

Los prototipos móviles son parte de la propuesta de integración móvil/web. No implementan lógica backend completa porque el alcance académico pide primeras interacciones de navegación, no una app distribuible terminada.

## Tecnologías

- Python
- Django 4.2
- SQLite local para desarrollo
- Django Admin con Jazzmin
- HTML templates y CSS

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/lCristianAlee/Foodplease-CRUD.git
cd Foodplease-CRUD
```

### 2. Crear entorno virtual

Windows:

```powershell
python -m venv venv
.\venv\Scripts\activate
```

Mac / Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

```powershell
Copy-Item .env.example .env
```

En Mac / Linux:

```bash
cp .env.example .env
```

Para producción, genera una `DJANGO_SECRET_KEY` propia y cambia `DJANGO_DEBUG=False`.

### 5. Crear base de datos local

```bash
python manage.py migrate
```

La base de datos se crea como `db.sqlite3` en la raíz del proyecto. Este archivo no se sube a GitHub.

### 6. Crear superusuario

```bash
python manage.py createsuperuser
```

### 7. Ejecutar servidor

```bash
python manage.py runserver
```

Rutas principales:

- `http://127.0.0.1:8000/` redirige al menú.
- `http://127.0.0.1:8000/menu/` muestra el menú público.
- `http://127.0.0.1:8000/admin/` abre el panel administrador.

## Cómo probar el CRUD

1. Entrar a `http://127.0.0.1:8000/admin/`.
2. Iniciar sesión con el superusuario.
3. Crear platos con nombre, descripción, categoría, precio, disponibilidad e imagen URL opcional.
4. Abrir `http://127.0.0.1:8000/menu/` y confirmar que los platos aparecen.
5. Probar filtros: `Todos`, `Pastas`, `Carnes`, `Pescados`, `Bebidas`, `Postres`, `Otros`.
6. Entrar al detalle de un plato.
7. Cambiar disponibilidad o precio desde el admin y verificar el cambio en el menú.
8. Borrar un plato y confirmar que deja de aparecer.

## Tests

```bash
python manage.py test menu
```

La suite cubre modelo, listado, filtro por categoría, imagen URL, placeholder, detalle, links a mockups, seguridad básica del admin y redirección desde `/`.

## Mockups navegables

- App móvil del cliente: https://lcristianalee.github.io/Foodplease-CRUD/mockups/mobile-prototype/
- App móvil del repartidor: https://lcristianalee.github.io/Foodplease-CRUD/mockups/driver-prototype/
- Web pública: https://lcristianalee.github.io/Foodplease-CRUD/mockups/web-prototype/

El código fuente de los prototipos está en `docs/mockups/`. También se pueden abrir localmente sirviéndolos por HTTP:

```powershell
cd docs/mockups
python -m http.server 8001
```

Luego abrir:

- `http://localhost:8001/mobile-prototype/`
- `http://localhost:8001/driver-prototype/`
- `http://localhost:8001/web-prototype/`

## Decisiones de diseño

Las decisiones arquitectónicas se documentan en `docs/adr/`:

- `docs/adr/adr-001-framework-web.md`
- `docs/adr/adr-002-base-de-datos.md`
- `docs/adr/adr-003-panel-administrativo-jazzmin.md`
