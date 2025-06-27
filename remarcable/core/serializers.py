from rest_framework import serializers
from .models import SongTag, UUIDModel, Artist, Genre, Tag, Playlist, Song
from django.contrib.auth.models import User

class UUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = UUIDModel 
        fields = "__all__"
        read_only_fields = ['id']

class SongTagSerializer(UUIDSerializer):
    class Meta:
        model = SongTag
        fields = "__all__"

class ArtistSerizlier(UUIDSerializer):
    class Meta:
        model =  Artist
        fields = "__all__"

class GenreSerializer(UUIDSerializer):
    class Meta:
        model = Genre 
        fields = "__all__"

class TagSerializer(UUIDSerializer):
    class Meta:
        model = Tag 
        fields = "__all__"

class SongSerializer(UUIDSerializer):
    class Meta:
        model = Song 
        fields = "__all__"

class PlaylistSerializer(UUIDSerializer):
    class Meta:
        model = Playlist 
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User