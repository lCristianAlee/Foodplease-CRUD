from django.contrib import admin
from django.utils.html import format_html

from .models import Producto


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "categoria", "precio_formateado", "estado_disponibilidad")
    list_filter = ("categoria", "disponible")
    search_fields = ("nombre", "descripcion")
    list_per_page = 25
    fieldsets = (
        ("Información del plato", {"fields": ("nombre", "descripcion", "categoria", "imagen_url")}),
        ("Comercial", {"fields": ("precio", "disponible")}),
    )

    @admin.display(description="Precio", ordering="precio")
    def precio_formateado(self, obj):
        # Formato de miles con punto siguiendo la convencion local chilena.
        return f"${int(obj.precio):,}".replace(",", ".")

    @admin.display(description="Disponibilidad", ordering="disponible")
    def estado_disponibilidad(self, obj):
        # format_html escapa los argumentos automaticamente (defensa XSS).
        clase = "fp-admin-badge--available" if obj.disponible else "fp-admin-badge--unavailable"
        etiqueta = "Disponible" if obj.disponible else "Agotado"
        return format_html('<span class="fp-admin-badge {}">{}</span>', clase, etiqueta)
