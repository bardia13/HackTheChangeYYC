from django.urls import path
from .views import AddVideoAPI, KeywordAPIView
urlpatterns = [
    path("video/add/", AddVideoAPI.as_view()),
    path("keyword/<int:pk>/", KeywordAPIView.as_view())
]
