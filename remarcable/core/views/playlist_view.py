from core.models import Song, Tag, Playlist, Genre
from core.serializers import SongSerializer 
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = SongSerializer

    # Sends back 5 recommended songs based on genre and tags in current playlist
    @action(detail=True, methods=["get"], url_path="recommend-songs")
    def recommend_songs(self, request, pk=None): 
        playlist = self.get_object()
        playlist_songs = playlist.songs

        genres = Genre.objects.filter(song__in=playlist_songs).distinct()
        tags = Tag.objects.filter(songtag__song__in=playlist_songs).distinct()

        songs_matching_genres = Song.filter(genre__in=genres)
        songs_matching_tags = songs_matching_genres.filter(songtag__tag__in=tags).distinct()

        # Exclude songs already in the playlist
        new_songs = songs_matching_tags.exclude(id__in=playlist.songs.values_list("id", flat=True)) 
        # Randomly choose 5 songs to recommend
        recommended_songs = new_songs.order_by("?")[:5]

        return Response(
            {
                "songs": SongSerializer(recommended_songs, many=True)
            },
            status=status.HTTP_200_OK,
        ) 


    @action(detail=True, methods=["post"], url_path="add-song")
    def add_song(self, request, pk=None):
        playlist = self.get_object()
        song_id = request.data.get("song_id")
        if not song_id:
            return Response(
                {"error": "Song id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            song = Song.objects.get(id=song_id)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Song does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        playlist.songs.add(song)

        return Response(
            {"message": "Song added successfully to playlist."},
            status=status.HTTP_200_OK,
        ) 

    @action(detail=True, methods=["post"], url_path="remove-song")
    def remove_song(self, request, pk=None):
        playlist = self.get_object()
        song_id = request.data.get("song_id")
        if not song_id:
            return Response(
                {"error": "Song id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            song = Song.objects.get(id=song_id)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Song does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        playlist.songs.remove(song)

        return Response(
            {"message": "Song removed successfully from playlist."},
            status=status.HTTP_200_OK,
        ) 