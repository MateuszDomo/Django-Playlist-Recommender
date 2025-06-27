from core.models import Song, SongTag, Tag
from core.serializers import SongSerializer 
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        genre_id = self.request.query_params.get('genre')
        if genre_id:
            qs = qs.filter(genre_id=genre_id)

        tags = self.request.query_params.getlist('tags')
        if tags:
            qs = qs.filter(tags__id__in=tags).distinct()

        description = self.request.query_params.get('description')
        if description:
            qs = qs.filter(description__icontains=description)

        return qs

    @action(detail=True, methods=["post"], url_path="user-add-tag")
    @transaction.atomic
    def user_add_song_tag(self, request, pk=None):
        user = request.user
        song = self.get_object()

        tag_name = request.data.get("tag")
        if not tag_name:
            return Response(
                {"error": "Tag name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tag, _ = Tag.objects.get_or_create(name=tag_name, user_created=True)

        current_count = SongTag.objects.filter(song=song, user=user).count()
        if current_count > 2:
            return Response(
                {"error": "Maximum of 3 tags per user per song exceeded."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        song_tag, created = SongTag.objects.get_or_create(
            song=song, user=user, tag=tag
        )
        song_tag.subscribed_by.add(user)

        return Response(
            {"message": "Tag added successfully."},
            status=status.HTTP_200_OK,
        ) 

    @action(detail=True, methods=["post"], url_path="user-remove-tag")
    @transaction.atomic
    def user_remove_song_tag(self, request, pk=None):
        user = request.user
        song = self.get_object()
        tag_name = request.data.get("tag")
        if not tag_name:
            return Response(
                {"error": "Tag name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            tag = Tag.objects.get(name=tag_name)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Tag does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            song_tag = SongTag.objects.get(
                song=song, user=user, tag=tag
            )
        except ObjectDoesNotExist:
            return Response(
                {"error": "Tag does not exist on song."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        song_tag.subscribed_by.remove(user)
        if song_tag.subscribed_by.count() == 0:
            song_tag.delete()

        if tag.user_created and not SongTag.objects.filter(tag=tag).exists():
            tag.delete()
        
        return Response(
            {"message": "Tag added successfully."},
            status=status.HTTP_200_OK,
        ) 
