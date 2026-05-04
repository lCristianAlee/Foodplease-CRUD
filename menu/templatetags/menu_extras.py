import hashlib

from django import template

register = template.Library()


@register.filter
def precio_clp(value):
    try:
        entero = int(value)
    except (TypeError, ValueError):
        return value
    return f"{entero:,}".replace(",", ".")


@register.filter
def hue_para(value):
    if value is None:
        return 14
    digest = hashlib.md5(str(value).encode("utf-8"), usedforsecurity=False).hexdigest()
    return int(digest[:4], 16) % 360
