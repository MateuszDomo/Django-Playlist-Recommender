from django.db import models
from django.contrib.auth.models import User

import uuid

class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True 

class Artist(UUIDModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Genre(UUIDModel):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Tag(UUIDModel):
    user_created = models.BooleanField(default=False)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

class Song(UUIDModel):
    name = models.CharField(max_length=50)
    genre = models.ForeignKey(Genre, on_delete=models.PROTECT)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    description = models.CharField(max_length=250, default="")

    def __str__(self):
        return self.name
    
class SongTag(UUIDModel):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    subscribed_by = models.ManyToManyField(User)

    def __str__(self):
        return self.tag.name

class Playlist(UUIDModel):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='songs')
    songs = models.ManyToManyField(Song)

    def __str__(self):
        return self.name