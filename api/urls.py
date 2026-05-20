from django.urls import path
from .views import *

urlpatterns = [
    path("", home),
    path("constructor/", constructor, name="constructor"),
]