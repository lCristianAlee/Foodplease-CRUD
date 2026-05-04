from django.views.generic import DetailView, ListView

from .models import Producto

PRODUCTOS_RELACIONADOS_MAX = 3


class ProductoListView(ListView):
    model = Producto
    template_name = "menu/producto_list.html"
    context_object_name = "productos"


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
