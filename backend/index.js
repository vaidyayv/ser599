import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import express, { query } from "express";
import cors from "cors";
import fs from 'fs';

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// use your firebase config
const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const app = express();

const saveDataToFile = function () {
    const data = JSON.stringify(movies);
    fs.writeFile('movies.json', data, err => {
        if (err) {
            throw err
        }
        console.log('JSON data is saved.')
    })
}

app.get("/loadMovie", async (req, res) => {
    if (allMovies.length == 0) {
        saveDataToFile();
        transformMovies();
    }
    let randomMovieIndex = allMovies.findIndex(movie => movie.imdbID == req.query.id)
    let recommendations = getRecommendations(randomMovieIndex, req.query.exp);
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.send({
        "status": "success",
        "data": {
            "movie": allMovies[randomMovieIndex],
            recommendations,
        }
    });
});

app.get("/createSession", async (req, res) => {
    let id = req.query.id
    let timestamp = new Date();
    let deviceType = req.query.device
    await setDoc(doc(db, "events"+req.query.exp, id), {
        timestamp,
        deviceType
    });
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.send({
        "status": "success"
    });
});

app.get("/addVisit", async (req, res) => {
    let id = req.query.id;
    let visitId = req.query.visitId;
    let timestamp = new Date();
    const visitDoc = doc(db, "events"+req.query.exp, id);
    let data = await (await getDoc(visitDoc)).data();
    let visits = data?.visits ?? [];
    visits.push({
        id: visitId,
        timestamp
    })
    setDoc(visitDoc, { visits }, { merge: true });
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.send({
        "status": "success"
    });
});

app.get("/addSelection", async (req, res) => {
    let id = req.query.id;
    let selectionId = req.query.selectionId;
    let timestamp = new Date();
    const visitDoc = doc(db, "events"+req.query.exp, id);
    setDoc(visitDoc, {
        selection: {
            id: selectionId,
            timestamp
        }
    }, {
        merge: true
    }
    );
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.send({
        "status": "success"
    });
});

app.get("/loadInitialRecommendation", async (req, res) => {
    if (allMovies.length == 0) {
        saveDataToFile();
        transformMovies();
    }
    let recommendations = getRandomRecommendations(-1, allMovies, 10);
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.send({
        "status": "success",
        "data": {
            recommendations
        }
    })
});

var getRecommendations = function (selectedMovieIndex, exp) {
    switch(exp) {
        case "a":
            return getRandomRecommendations(selectedMovieIndex, allMovies, 10);
        case "b":
            return getSameGenreRecommendations(selectedMovieIndex, 10);
        case "c":
            return getMixedGenreRecommendations(selectedMovieIndex);
        default:
            return getSubGenreRecommendations(selectedMovieIndex);
    }
}

var getRandomRecommendations = function(selectedMovieIndex, movieList, count) {
    let recommendedMovies = new Set()
    while (recommendedMovies.size < count) {
        let randomMovieIndex = Math.floor(movieList.length * Math.random());
        if (randomMovieIndex != selectedMovieIndex) {
            recommendedMovies.add(movieList[randomMovieIndex]);
        }
    }
    return Array.from(recommendedMovies);
}

var getSameGenreRecommendations = function(selectedMovieIndex, count) {
    let selectedMovie = allMovies[selectedMovieIndex];
    let genres = selectedMovie["Genre"];
    let allGenres = Object.keys(movies);
    let genresArr = genres.split(",").map(gnr => gnr.toLowerCase().trim()).filter(gnr => allGenres.includes(gnr));
    let genre = genresArr[0];
    return getRandomRecommendations(selectedMovieIndex, movies[genre], count);
}

var getMixedGenreRecommendations = function(selectedMovieIndex) {
    return [...getSameGenreRecommendations(selectedMovieIndex, 5), ... getRandomRecommendations(selectedMovieIndex, allMovies, 5)];
}

var getSubGenreRecommendations = function(selectedMovieIndex) {
    let selectedMovie = allMovies[selectedMovieIndex];
    let genres = selectedMovie["Genre"];
    let allGenres = Object.keys(movies);
    let genresArr = genres.split(",").map(gnr => gnr.toLowerCase().trim()).filter(gnr => allGenres.includes(gnr));
    switch(genresArr.length) {
        case 1:
            return getSameGenreRecommendations(selectedMovieIndex, 10);
        case 2:
            return [
                ...getRandomRecommendations(selectedMovieIndex, movies[genresArr[0]], 5),
                ...getRandomRecommendations(selectedMovieIndex, movies[genresArr[1]], 5)
            ];
        default:
            return [
                ...getRandomRecommendations(selectedMovieIndex, movies[genresArr[0]], 4),
                ...getRandomRecommendations(selectedMovieIndex, movies[genresArr[1]], 3),
                ...getRandomRecommendations(selectedMovieIndex, movies[genresArr[2]], 3)
            ];
    }
}

var transformMovies = function () {
    Object.keys(movies).forEach(genre => {
        allMovies = [...allMovies, ...movies[genre]]
    })
}

var movies = {};
var allMovies = [];

var getDocuments = function () {
    fs.readFile("./movies.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        movies = JSON.parse(jsonString);
        let set = new Set();
        Object.keys(movies).forEach(genre => {
            movies[genre].forEach(m => set.add(m["Genre"].split(", ").length))
        })
        console.log("number of genres: ", set);
    });

}

getDocuments();

app.use(cors({
    origin: '*'
}));

process.env.PORT = process.env.PORT ?? 8080
app.listen(process.env.PORT, () => console.log("Server listening at port "+process.env.PORT));
