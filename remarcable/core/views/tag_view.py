from core.models import Song, SongTag, Tag
from core.serializers import TagSerializer 
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer 

    permission_classes = [permissions.IsAuthenticated] 
