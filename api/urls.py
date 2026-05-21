from django.urls import path
from .views import *

urlpatterns = [
    path("", home),
    path("constructor/", constructor, name="constructor"),
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path('hello/', hello, name='hello'),
]