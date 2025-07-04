from core.models import Song, Tag, Playlist, Genre
from core.serializers import PlaylistSerializer, SongSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
import random


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        queryset = Playlist.objects.all()
        user = self.request.user
        user_specific = self.request.query_params.get('user_specific')
        if user_specific:
            queryset = queryset.filter(user=user)
        return queryset
    
    # User for playlist is always created by user sending request. Save requesting user in serializer before creating
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Sends back 5 recommended songs based on genre and tags in current playlist
    @action(detail=True, methods=["get"], url_path="recommend-songs")
    def recommend_songs(self, request, pk=None): 
        playlist = self.get_object()
        playlist_songs = playlist.songs.all()

        genres = Genre.objects.filter(song__in=playlist_songs).distinct()
        tags = Tag.objects.filter(songtag__song__in=playlist_songs).distinct()

        songs_matching_genres = Song.objects.filter(genre__in=genres)
        
        songs_matching_tags = Song.objects.filter(id__in=Song.objects.filter(songtag__tag__in=tags).values_list('id', flat=True))

        combined_songs = (songs_matching_genres | songs_matching_tags).distinct()

        # Exclude songs already in the playlist
        excluded_ids = playlist_songs.values_list("id", flat=True)
        new_songs = combined_songs.exclude(id__in=excluded_ids)

        # Randomly choose 5 songs to recommend. If cannot get 5, fill in the rest with non filtered songs.
        new_song_ids = list(new_songs.values_list("id", flat=True))
        rand_ids = random.sample(new_song_ids, min(len(new_song_ids), 5))
        recommended_songs = list(Song.objects.filter(id__in=rand_ids))
        if len(recommended_songs) < 5:
            need = 5 - len(recommended_songs)
            recommended_songs += list(Song.objects.exclude(id__in=excluded_ids).exclude(id__in=new_song_ids)[:need])

        return Response(
            {
                "songs": SongSerializer(recommended_songs, many=True).data
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