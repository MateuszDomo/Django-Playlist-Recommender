from django.urls import path, include
from core.views.song_view import SongViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'songs', SongViewSet, basename='song')


urlpatterns = [
    path('', include(router.urls)),
]