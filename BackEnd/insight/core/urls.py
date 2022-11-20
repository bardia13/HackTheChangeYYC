from django.urls import path
from .views import AddVideoAPI, KeywordAPIView, NoteAPI, NoteCreateAPI, NoteCommentAPI, NoteCommentCreateAPI
urlpatterns = [
    path("video/add/", AddVideoAPI.as_view()),
    path("keyword/<int:pk>/", KeywordAPIView.as_view()),
    path("video/<int:vid>/notes/", NoteAPI.as_view() ), 
    path("video/notes/add/", NoteCreateAPI.as_view()),
    path("note/<int:nid>/comments/", NoteCommentAPI.as_view()), 
    path("note/comments/create/", NoteCommentCreateAPI.as_view())
]
