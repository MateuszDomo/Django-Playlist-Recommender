FROM python:3.11

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Run migrations, start Django development server, run commands
CMD ["sh", "-c", "rm -f db.sqlite3 && python manage.py migrate && python manage.py create_admin && python manage.py import_songs && python manage.py runserver 0.0.0.0:8000"]

