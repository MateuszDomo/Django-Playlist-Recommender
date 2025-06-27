from core.models import Genre, Song, SongTag, Tag
from core.serializers import GenreSerializer 
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer 

    permission_classes = [permissions.IsAuthenticated] 