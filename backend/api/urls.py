from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"), #when we go to this url, we will be able to see the list of notes
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"), #when we go to this url, we will be able to delete a note
]