from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VideoSerializer, NoteSerializer, NoteCommentSerializer
from .models import Keyword, Note, NoteComment
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
        
        
class NoteAPI(ListAPIView):
    serializer_class = NoteSerializer
    def get_queryset(self):
        vid = self.kwargs["vid"]
        return Note.objects.filter(video_id = vid)

class NoteCreateAPI(CreateAPIView):
    serializer_class = NoteSerializer

class NoteCommentAPI(ListAPIView):
    serializer_class = NoteCommentSerializer
    def get_queryset(self):
        nid = self.kwargs["nid"]
        return NoteComment.objects.filter(note_id=nid)

class NoteCommentCreateAPI(CreateAPIView):
    serializer_class = NoteCommentSerializer
