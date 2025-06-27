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

class ArtistSerializer(UUIDSerializer):
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
    genre = GenreSerializer(read_only=True)
    artist = ArtistSerializer(read_only=True)
    tags = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Song 
        fields = "__all__"

    def get_tags(self, obj):
        song_tags = SongTag.objects.filter(song=obj)
        return TagSerializer([st.tag for st in song_tags], many=True).data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

class PlaylistSerializer(UUIDSerializer):
    user = UserSerializer(read_only=True)
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist 
        fields = "__all__"
        read_only_fields = ("songs", "user")

