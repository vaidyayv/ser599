import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import requests

from constants.movie_genres import movie_genres 
import requests
import os

cred = credentials.Certificate('./key/movie-recommendation.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

if not os.path.exists("./temp"):
    os.mkdir("./temp")

# use your base url for firebase storage
base_url = ""

for movie_genre in movie_genres:
    doc_ref = db.collection("genres").document(movie_genre).collection("movies")
    docs = doc_ref.stream()
    for doc in docs:
        poster = doc.to_dict().get("Poster")
        img_name_arr = poster.split("/")
        img_name = img_name_arr[len(img_name_arr)-1]
        url = base_url+img_name +"?alt=media"
        movie_doc_ref = db.collection("genres").document(movie_genre).collection("movies").document(doc.to_dict().get("imdbID"))
        movie_doc_ref.set({
            "Poster": url
        }, merge=True)