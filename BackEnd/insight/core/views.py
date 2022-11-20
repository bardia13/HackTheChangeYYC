from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VideoSerializer
from .models import Keyword
from .ml import get_google_knowledge_results
from django.http import Http404
# Create your views here.


class AddVideoAPI(CreateAPIView):
    serializer_class = VideoSerializer
    

class KeywordAPIView(APIView):

    def get_object(self, pk):
        try:
            return Keyword.objects.get(pk=pk)
        except Keyword.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        keyword = self.get_object(pk)
        result = get_google_knowledge_results(keyword.keyword)
        return Response(result)
        
        
