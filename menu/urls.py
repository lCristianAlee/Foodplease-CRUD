from django.urls import path
from django.views.generic import RedirectView

from .views import ProductoDetailView, ProductoListView

app_name = "menu"

urlpatterns = [
    path("", ProductoListView.as_view(), name="lista"),
    path(
        "app/clientes/",
        RedirectView.as_view(
            url="https://lcristianalee.github.io/Foodplease-CRUD/mockups/mobile-prototype/",
            permanent=False,
        ),
        name="app_clientes",
    ),
    path(
        "app/repartidores/",
        RedirectView.as_view(
            url="https://lcristianalee.github.io/Foodplease-CRUD/mockups/driver-prototype/",
            permanent=False,
        ),
        name="app_repartidores",
    ),
    path("<int:pk>/", ProductoDetailView.as_view(), name="detalle"),
]
