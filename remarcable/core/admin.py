from django.contrib import admin
from .models import Artist, Genre, Tag, Song, SongTag, Playlist

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'user_created')
    search_fields = ('name',)
    list_filter = ('user_created',)


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('name', 'artist', 'genre')
    search_fields = ('name', 'artist__name')
    list_filter = ('genre',)


@admin.register(SongTag)
class SongTagAdmin(admin.ModelAdmin):
    list_display = ('tag', 'song')
    search_fields = ('tag__name', 'song__name')
    filter_horizontal = ('subscribed_by',)


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    search_fields = ('name', 'user__username')
    filter_horizontal = ('songs',)