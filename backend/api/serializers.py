from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta: #Meta class is used to define the fields that we want to serialize
        model = User
        fields = ["id", "username", "password" ]
        extra_kwargs = {"password": {"write_only": True}} #no one can read what the password is

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #create user with validated data
        return user
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} #no one can set the author
        