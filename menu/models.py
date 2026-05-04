from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=200, verbose_name="Nombre del Plato")
    descripcion = models.TextField(verbose_name="Descripción", blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    disponible = models.BooleanField(default=True, verbose_name="Disponible")

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre
