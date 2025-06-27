from django.urls import path, include
from core.views.song_view import SongViewSet
from core.views.tag_view import TagViewSet 
from core.views.genre_view import GenreViewSet 
from core.views.playlist_view import PlaylistViewSet 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'api/songs', SongViewSet, basename='api/songs')
router.register(r'api/tags', TagViewSet, basename='api/tags')
router.register(r'api/genres', GenreViewSet, basename='api/genres')
router.register(r'api/playlists', PlaylistViewSet, basename='api/playlists')


urlpatterns = [
    path('', include(router.urls)),
]