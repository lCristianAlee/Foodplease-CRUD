# FoodPlease CRUD

FoodPlease es una aplicación web backend desarrollada con Django, estructurada en 3 capas (Modelo, Vista, Controlador/Template), encargada de la gestión del inventario y menú de un restaurante o servicio de delivery.

## Características

- **Arquitectura de 3 capas** aplicadas con el framework web Django.
- **CRUD funcional** a través del Panel de Administración.
- **Vistas Basadas en Clases (CBV):** emplea `ListView` para renderizar el menú completo y `DetailView` para acceder dinámicamente a la ficha de cada plato.
- Interfaz conectada al backend mediante sistema de _templates_ heredables HTML pre-construido.

---

## Guía de instalación y ejecución local

Para clonar y correr el proyecto en sus propias máquinas locales, tus compañeros deben seguir los siguientes pasos:

### 1. Clonar el repositorio
Abre tu terminal y ejecuta el siguiente comando:
```bash
git clone <URL_DEL_REPOSITORIO>
cd <nombre-de-la-carpeta>
```

### 2. Crear un entorno virtual
Se recomienda utilizar un entorno virtual para aislar las dependencias del proyecto.
- **Mac / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```
- **Windows:**
  ```bash
  python -m venv venv
  venv\Scripts\activate
  ```

### 3. Instalar las dependencias
Instala los módulos necesarios definidos en el archivo `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno
La configuración sensible (clave secreta, modo debug, hosts permitidos) se carga desde un archivo `.env` que **no se versiona**. Copia la plantilla y ajusta los valores:
```bash
# Mac / Linux
cp .env.example .env
# Windows (PowerShell)
Copy-Item .env.example .env
```
Para producción, genera una `DJANGO_SECRET_KEY` propia:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 5. Configurar la base de datos local
Por buenas prácticas, la base de datos SQL no se sube a Github. La primera vez debes generarla aplicando las migraciones:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Crear superusuario
Para tener gestión sobre los platos (Crear, Leer, Actualizar, Borrar), necesitas un usuario administrador en tu sistema local:
```bash
python manage.py createsuperuser
```
> Sigue las instrucciones de la terminal e ingresa un nombre de usuario, correo y contraseña. *(La contraseña no se mostrará mientras escribes).*

### 7. Ejecutar el servidor
Finalmente, arranca la aplicación:
```bash
python manage.py runserver
```

### 8. Ejecutar la suite de tests
```bash
python manage.py test menu
```

---

## Cómo utilizar y probar el CRUD

Una vez iniciado el servidor, hay dos URLs importantes:

### 1. Panel de Administración `/admin/`
Ve a la ruta local `http://127.0.0.1:8000/admin/`.
Ingresa con el superusuario que creaste en el **paso 6**. Podrás realizar todo lo siguiente:

- **Crear:** click en el modelo **Productos** → **Añadir**. Completa nombre, precio, descripción e indica si está disponible. Guarda.
- **Leer:** la lista misma muestra desde la base de datos lo grabado con anterioridad.
- **Actualizar:** entra al artículo para editar la descripción, o desde la lista inicial edita directamente disponibilidad y precio y luego "Guardar".
- **Borrar:** seleccionando la casilla al lado izquierdo del producto en la tabla, el desplegable te dará la opción para borrar un ítem permanentemente.

### 2. Panel Público (Menú) `/menu/`
Ve a la ruta base de lectura `http://127.0.0.1:8000/menu/`.
Aquí verás presentados los resultados provenientes de la base de datos:
- Menú general.
- Interfaz de "Detalle" tras cliquear en algún plato.

---

## Decisiones de diseño

Las decisiones arquitectónicas se documentaron en [`docs/adr/`](docs/adr/):

- [ADR-001 — Framework web](docs/adr/adr-001-framework-web.md)
- [ADR-002 — Base de datos](docs/adr/adr-002-base-de-datos.md)
- [ADR-003 — Panel administrativo](docs/adr/adr-003-panel-administrativo-jazzmin.md)

## Mockups

Las pantallas están publicadas en GitHub Pages para revisión sin necesidad de clonar el repositorio:

- **App móvil del cliente:** https://lcristianalee.github.io/Foodplease-CRUD/mockups/mobile-prototype/
- **App móvil del repartidor:** https://lcristianalee.github.io/Foodplease-CRUD/mockups/driver-prototype/
- **Web pública (escritorio):** https://lcristianalee.github.io/Foodplease-CRUD/mockups/web-prototype/

El código fuente de cada prototipo está en [`docs/mockups/`](docs/mockups/).
También se pueden abrir localmente sirviéndolos con `python -m http.server` desde esa carpeta.
