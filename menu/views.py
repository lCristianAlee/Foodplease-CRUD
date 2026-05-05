from django.views.generic import DetailView, ListView

from .models import Producto

PRODUCTOS_RELACIONADOS_MAX = 3


class ProductoListView(ListView):
    model = Producto
    template_name = "menu/producto_list.html"
    context_object_name = "productos"

    def get_categoria_actual(self):
        categoria = self.request.GET.get("categoria")
        categorias_validas = {opcion.value for opcion in Producto.Categoria}
        if categoria in categorias_validas:
            return categoria
        return None

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        contexto["categoria_actual"] = self.get_categoria_actual()
        contexto["categorias"] = [
            {"valor": valor, "etiqueta": etiqueta}
            for valor, etiqueta in Producto.Categoria.choices
        ]
        return contexto


class ProductoDetailView(DetailView):
    model = Producto
    template_name = "menu/producto_detail.html"
    context_object_name = "producto"

    def get_context_data(self, **kwargs):
        contexto = super().get_context_data(**kwargs)
        # Solo se sugieren platos disponibles para no enviar al cliente a un
        # producto que no podra pedir; se excluye el actual para evitar el bucle.
        contexto["relacionados"] = (
            Producto.objects.filter(disponible=True)
            .exclude(pk=self.object.pk)
            .order_by("?")[:PRODUCTOS_RELACIONADOS_MAX]
        )
        return contexto
