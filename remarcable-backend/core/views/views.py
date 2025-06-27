from core.models import Playlist, Song
from core.serializers import SongSerializer, PlaylistSerializer
from rest_framework import viewsets


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
