from decimal import Decimal

from django.test import TestCase
from django.urls import reverse

from menu.models import Producto


class ProductoModelTests(TestCase):
    def test_str_devuelve_nombre(self):
        producto = Producto.objects.create(
            nombre="Pizza Margarita",
            precio=Decimal("9990.00"),
        )
        self.assertEqual(str(producto), "Pizza Margarita")

    def test_disponible_por_defecto_es_true(self):
        producto = Producto.objects.create(
            nombre="Lasagna",
            precio=Decimal("12500.00"),
        )
        self.assertTrue(producto.disponible)

    def test_categoria_por_defecto_es_otros(self):
        producto = Producto.objects.create(
            nombre="Lasagna",
            precio=Decimal("12500.00"),
        )
        self.assertEqual(producto.categoria, Producto.Categoria.OTROS)

    def test_imagen_url_es_opcional(self):
        producto = Producto.objects.create(
            nombre="Lasagna",
            precio=Decimal("12500.00"),
        )
        self.assertIsNone(producto.imagen_url)

    def test_ordering_por_nombre(self):
        Producto.objects.create(nombre="Zucchini", precio=Decimal("1.00"))
        Producto.objects.create(nombre="Anchoa", precio=Decimal("1.00"))
        nombres = list(Producto.objects.values_list("nombre", flat=True))
        self.assertEqual(nombres, ["Anchoa", "Zucchini"])


class ProductoListViewTests(TestCase):
    def test_listado_responde_200_y_usa_template_correcto(self):
        respuesta = self.client.get(reverse("menu:lista"))
        self.assertEqual(respuesta.status_code, 200)
        self.assertTemplateUsed(respuesta, "menu/producto_list.html")

    def test_listado_muestra_productos_creados(self):
        Producto.objects.create(nombre="Empanada", precio=Decimal("2500.00"))
        respuesta = self.client.get(reverse("menu:lista"))
        self.assertContains(respuesta, "Empanada")

    def test_listado_vacio_muestra_mensaje(self):
        respuesta = self.client.get(reverse("menu:lista"))
        self.assertContains(respuesta, "Aún no hay platos registrados")

    def test_listado_prepara_filtro_por_categoria_sin_recarga(self):
        Producto.objects.create(
            nombre="Pasta Bolognesa",
            precio=Decimal("8500.00"),
            categoria=Producto.Categoria.PASTAS,
        )
        Producto.objects.create(
            nombre="Pollo Grillado",
            precio=Decimal("9500.00"),
            categoria=Producto.Categoria.CARNES,
        )

        respuesta = self.client.get(reverse("menu:lista"), {"categoria": "pastas"})

        self.assertContains(respuesta, "Pasta Bolognesa")
        self.assertContains(respuesta, "Pollo Grillado")
        self.assertContains(respuesta, 'data-category="pastas"')
        self.assertContains(respuesta, 'data-category="carnes"')
        self.assertContains(respuesta, 'data-category-filter="pastas"')
        self.assertEqual(respuesta.context["categoria_actual"], "pastas")

    def test_listado_ignora_categoria_invalida(self):
        Producto.objects.create(
            nombre="Pasta Bolognesa",
            precio=Decimal("8500.00"),
            categoria=Producto.Categoria.PASTAS,
        )
        Producto.objects.create(
            nombre="Pollo Grillado",
            precio=Decimal("9500.00"),
            categoria=Producto.Categoria.CARNES,
        )

        respuesta = self.client.get(reverse("menu:lista"), {"categoria": "invalida"})

        self.assertContains(respuesta, "Pasta Bolognesa")
        self.assertContains(respuesta, "Pollo Grillado")
        self.assertIsNone(respuesta.context["categoria_actual"])

    def test_listado_muestra_imagen_url_si_existe(self):
        Producto.objects.create(
            nombre="Pizza",
            precio=Decimal("9990.00"),
            imagen_url="https://example.com/pizza.jpg",
        )

        respuesta = self.client.get(reverse("menu:lista"))

        self.assertContains(respuesta, "https://example.com/pizza.jpg")
        self.assertContains(respuesta, "dish-image--photo")

    def test_listado_muestra_placeholder_si_no_hay_imagen_url(self):
        Producto.objects.create(
            nombre="Pizza",
            precio=Decimal("9990.00"),
        )

        respuesta = self.client.get(reverse("menu:lista"))

        self.assertContains(respuesta, "dish-image__label")
        self.assertContains(respuesta, "Imagen referencial del plato Pizza")

    def test_listado_tiene_tarjeta_vacia_para_filtro_sin_resultados(self):
        Producto.objects.create(
            nombre="Pizza",
            precio=Decimal("9990.00"),
            categoria=Producto.Categoria.PASTAS,
        )

        respuesta = self.client.get(reverse("menu:lista"))

        self.assertContains(respuesta, "dish-card--empty")
        self.assertContains(respuesta, "No hay platos en esta categoría")
        self.assertContains(respuesta, "data-menu-empty-filter")

    def test_listado_incluye_links_reales_a_apps_moviles(self):
        respuesta = self.client.get(reverse("menu:lista"))

        self.assertContains(respuesta, reverse("menu:app_clientes"))
        self.assertContains(respuesta, reverse("menu:app_repartidores"))

    def test_listado_carga_script_de_filtros(self):
        respuesta = self.client.get(reverse("menu:lista"))
        self.assertContains(respuesta, "menu/js/menu_filters.js")


class ProductoDetailViewTests(TestCase):
    def test_detalle_responde_200_para_producto_existente(self):
        producto = Producto.objects.create(
            nombre="Sushi Roll",
            precio=Decimal("8990.00"),
            descripcion="Salmón fresco con palta.",
        )
        respuesta = self.client.get(reverse("menu:detalle", args=[producto.pk]))
        self.assertEqual(respuesta.status_code, 200)
        self.assertContains(respuesta, "Sushi Roll")
        self.assertContains(respuesta, "Salmón fresco con palta.")

    def test_detalle_devuelve_404_para_producto_inexistente(self):
        respuesta = self.client.get(reverse("menu:detalle", args=[9999]))
        self.assertEqual(respuesta.status_code, 404)


class ProductoDetailRelacionadosTests(TestCase):
    def test_detalle_no_incluye_al_propio_producto_en_relacionados(self):
        principal = Producto.objects.create(nombre="Principal", precio=Decimal("1000"))
        Producto.objects.create(nombre="Otro", precio=Decimal("2000"))
        respuesta = self.client.get(reverse("menu:detalle", args=[principal.pk]))
        relacionados = list(respuesta.context["relacionados"])
        self.assertNotIn(principal, relacionados)

    def test_detalle_excluye_productos_no_disponibles(self):
        principal = Producto.objects.create(nombre="Principal", precio=Decimal("1000"))
        Producto.objects.create(nombre="Disponible", precio=Decimal("2000"), disponible=True)
        Producto.objects.create(nombre="Agotado", precio=Decimal("2000"), disponible=False)
        respuesta = self.client.get(reverse("menu:detalle", args=[principal.pk]))
        nombres = [p.nombre for p in respuesta.context["relacionados"]]
        self.assertIn("Disponible", nombres)
        self.assertNotIn("Agotado", nombres)


class TemplateTagsTests(TestCase):
    def test_precio_clp_formatea_con_separador_de_miles(self):
        from menu.templatetags.menu_extras import precio_clp
        self.assertEqual(precio_clp(35000), "35.000")
        self.assertEqual(precio_clp(1234567), "1.234.567")

    def test_hue_para_es_deterministico(self):
        from menu.templatetags.menu_extras import hue_para
        self.assertEqual(hue_para("Pasta"), hue_para("Pasta"))
        self.assertNotEqual(hue_para("Pasta"), hue_para("Sushi"))

    def test_hue_para_devuelve_rango_valido(self):
        from menu.templatetags.menu_extras import hue_para
        for nombre in ["Pasta", "Sushi", "Pizza", "Lasagna", "Tiramisú"]:
            valor = hue_para(nombre)
            self.assertGreaterEqual(valor, 0)
            self.assertLess(valor, 360)


class SeguridadTests(TestCase):
    def test_raiz_redirecciona_al_menu(self):
        respuesta = self.client.get("/", follow=False)
        self.assertEqual(respuesta.status_code, 302)
        self.assertIn(reverse("menu:lista"), respuesta.headers.get("Location", ""))

    def test_app_clientes_redirecciona_a_experiencia_movil(self):
        respuesta = self.client.get(reverse("menu:app_clientes"), follow=False)
        self.assertEqual(respuesta.status_code, 302)
        self.assertIn("mobile-prototype", respuesta.headers.get("Location", ""))

    def test_app_repartidores_redirecciona_a_experiencia_movil(self):
        respuesta = self.client.get(reverse("menu:app_repartidores"), follow=False)
        self.assertEqual(respuesta.status_code, 302)
        self.assertIn("driver-prototype", respuesta.headers.get("Location", ""))

    def test_admin_redirecciona_a_login_para_anonimos(self):
        respuesta = self.client.get("/admin/", follow=False)
        self.assertIn(respuesta.status_code, (301, 302))
        self.assertIn("/admin/login", respuesta.headers.get("Location", ""))

    def test_csrf_token_presente_en_login_admin(self):
        respuesta = self.client.get("/admin/login/")
        self.assertEqual(respuesta.status_code, 200)
        self.assertContains(respuesta, "csrfmiddlewaretoken")
