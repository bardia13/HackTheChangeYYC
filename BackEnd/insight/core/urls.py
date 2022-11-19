from django.urls import path
from .views import AddVideoAPI
urlpatterns = [
    path("video/add/", AddVideoAPI.as_view()),
]
