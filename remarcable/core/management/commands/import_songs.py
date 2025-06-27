import json
from django.core.management.base import BaseCommand
from core.models import Song, Genre, Tag, Artist
import os


class Command(BaseCommand):
    help = "Import Songs From JSON"

    def handle(self, *args, **kwargs):
        self.stdout.write("Importing Songs...")
        file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'songs.json')
        file_path = os.path.abspath(file_path)
        try:
            with open(file_path, 'r') as f:
                songs_data = json.load(f)
        except Exception as e:
            self.stdout.write(self.style.ERROR("Failure Opening song.json")); 
            self.stdout.write(self.style.ERROR("Tried: "+file_path)); 
            return
        
        songs_created = 0
        genres_created = 0
        tags_created = 0
        artists_created = 0

        for entry in songs_data:
            genre, genre_created  = Genre.objects.get_or_create(name=entry["genre"])
            if genre_created: genres_created += 1

            artist, artist_created = Artist.objects.get_or_create(name=entry["artist"])
            if artist_created:
                artists_created += 1

            song = Song.objects.create(
                name=entry['name'],
                genre=genre,
                artist=artist
            )
            songs_created += 1

            for tag_name in entry.get('tags', []):
                tag, tag_created = Tag.objects.get_or_create(name=tag_name)
                if tag_created: tags_created  += 1
                song.tags.add(tag)

        
        self.stdout.write(self.style.SUCCESS("Import completed!"))
        self.stdout.write(self.style.SUCCESS(f"Artists created: {artists_created}"))
        self.stdout.write(self.style.SUCCESS(f"Songs created: {songs_created}"))
        self.stdout.write(self.style.SUCCESS(f"Genres created: {genres_created}"))
        self.stdout.write(self.style.SUCCESS(f"Tags created: {tags_created}")) 

 