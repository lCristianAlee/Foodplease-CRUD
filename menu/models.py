from django.db import models


class Producto(models.Model):
    class Categoria(models.TextChoices):
        PASTAS = "pastas", "Pastas"
        CARNES = "carnes", "Carnes"
        PESCADOS = "pescados", "Pescados"
        BEBIDAS = "bebidas", "Bebidas"
        POSTRES = "postres", "Postres"
        OTROS = "otros", "Otros"

    nombre = models.CharField(max_length=200, verbose_name="Nombre del Plato")
    descripcion = models.TextField(verbose_name="Descripción", blank=True, null=True)
    categoria = models.CharField(
        max_length=20,
        choices=Categoria.choices,
        default=Categoria.OTROS,
        verbose_name="Categoría",
    )
    imagen_url = models.URLField(
        verbose_name="URL de imagen",
        blank=True,
        null=True,
        help_text="Opcional. Si se deja vacía, el menú muestra un placeholder.",
    )
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    disponible = models.BooleanField(default=True, verbose_name="Disponible")

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre
