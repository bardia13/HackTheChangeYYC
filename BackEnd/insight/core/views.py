from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .serializers import VideoSerializer
# Create your views here.


class AddVideoAPI(CreateAPIView):
    serializer_class = VideoSerializer
    