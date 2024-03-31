from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny 
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    #checks 
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        user = self.request.user #get the user from the request
        return Note.objects.all().filter(author=user) #return all the notes that belong to the user

    def perform_create(self, serializer): #overriding create method
        if serializer.is_valid(): #check if the serializer is valid
            serializer.save(author=self.request.user) #save the author as the user
        else:
            print(serializer.errors) #print the errors


class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.all().filter(author=user)
    
    

# Create your views here.
#Registration Form
class CreateUserView(generics.CreateAPIView): #built in class that allows us to create a user
    queryset = User.objects.all() #specifying the least of all different object
    serializer_class = UserSerializer #tell what kinda data we need to accept
    permission_classes = [AllowAny] #who can call this?

