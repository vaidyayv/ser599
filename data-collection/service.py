import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

import requests
import schedule
import time

from constants.movie_genres import movie_genres
from constants.api_key import api_key
from constants.genre_based_movie_ids import genre_based_movie_ids

cred = credentials.Certificate('./key/movie-recommendation.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

def scheduler():
    schedule.every(1).minutes.do(routine)
    while True:
        schedule.run_pending()
        time.sleep(1)

def routine():
    next_genre = fetch_next_genre()
    if(next_genre != ""):
        fetch_movies(next_genre)
    else:
        print("fetched movies for all genres")

def fetch_next_genre():
    saved_genres = fetch_genres()
    for genre in movie_genres:
        if genre not in saved_genres:
            return genre
    return ""

def fetch_genres():
    doc_ref = db.collection('genres')
    docs = doc_ref.stream()
    genres = []
    for doc in docs:
        genres.append(doc.id)
    return genres

def fetch_movies(genre):
    movie_ids = genre_based_movie_ids.get(genre)
    if(movie_ids is not None):
        for movie_id in movie_ids:
            movie = fetch_movie(genre, movie_id)
            save_movie(movie, genre, movie_id)
    
def fetch_movie(genre, id):
    # use your api url
    api_url = ""
    return requests.get(api_url).json()

def save_movie(movie, genre, id):
    doc_ref = db.collection('genres').document(genre)
    doc_ref.set({"exists": True})
    doc_ref = db.collection('genres').document(genre).collection("movies").document(id)
    doc_ref.set(movie)

scheduler()