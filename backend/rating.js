import { findGenre } from './findCoversionRates.js';

export function findAverageIMDBRatingOfSessionPerExperiment(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let visitsCount = 0;
        let imdbRating = 0;
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            for(let k=0; k<visits.length; k++) {
                let id = visits[k]["id"];
                let rating = +allMovies[id]["imdbRating"]
                if(!isNaN(rating)) {
                    imdbRating += rating;
                    visitsCount++;
                }
            }
        }
        console.log(`for ${files[i]}: average imdb rating = ${(imdbRating/visitsCount).toFixed(2)}`);
    }
}

export function findAverageIMDBRatingOfSessionPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based imdb rating from ${files[i]}:`);
        let events = data[i];
        let map = {};
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            for(let k=0; k<visits.length; k++) {
                let id = visits[k]["id"];
                let imdbRating = +allMovies[id]["imdbRating"];
                if(!isNaN(imdbRating)) {
                    const genre = findGenre(allMovies, visits[k]["id"]);
                    addToMap(map, genre, imdbRating);
                }
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: ${(map[genres[j]]["rating"]/map[genres[j]]["count"]).toFixed(2)}`);
        }
    }
}

export function findAverageIMDBRatingOfSessionWhenMovieIsSelectedPerExperiment(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => event["selection"]);
        let visitsCount = 0;
        let imdbRating = 0;
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            for(let k=0; k<visits.length; k++) {
                let id = visits[k]["id"];
                let rating = +allMovies[id]["imdbRating"]
                if(!isNaN(rating)) {
                    imdbRating += rating;
                    visitsCount++;
                }
            }
        }
        console.log(`for ${files[i]} successful sessions: average imdb rating = ${(imdbRating/visitsCount).toFixed(2)}`);
    }
}

export function findAverageIMDBRatingOfSessionWhenMovieIsSelectedPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based imdb rating from ${files[i]} successful sessions:`);
        let events = data[i].filter(event => event["selection"]);
        let map = {};
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            for(let k=0; k<visits.length; k++) {
                let id = visits[k]["id"];
                let imdbRating = +allMovies[id]["imdbRating"];
                if(!isNaN(imdbRating)) {
                    const genre = findGenre(allMovies, visits[k]["id"]);
                    addToMap(map, genre, imdbRating);
                }
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: ${(map[genres[j]]["rating"]/map[genres[j]]["count"]).toFixed(2)}`);
        }
    }
}

export function findAverageIMDBRatingOfSessionWhenMovieIsntSelectedPerExperiment(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => !event["selection"]);
        let visitsCount = 0;
        let imdbRating = 0;
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            for(let k=0; k<visits.length; k++) {
                let id = visits[k]["id"];
                let rating = +allMovies[id]["imdbRating"]
                if(!isNaN(rating)) {
                    imdbRating += rating;
                    visitsCount++;
                }
            }
        }
        console.log(`for ${files[i]} dropped sessions: average imdb rating = ${(imdbRating/visitsCount).toFixed(2)}`);
    }
}

export function findAverageIMDBRatingOfSessionWhenMovieIsntSelectedPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based imdb rating from ${files[i]} dropped sessions:`);
        let events = data[i].filter(event => !event["selection"]);
        let map = {};
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            for(let k=0; k<visits.length; k++) {
                let id = visits[k]["id"];
                let imdbRating = +allMovies[id]["imdbRating"];
                if(!isNaN(imdbRating)) {
                    const genre = findGenre(allMovies, visits[k]["id"]);
                    addToMap(map, genre, imdbRating);
                }
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: ${(map[genres[j]]["rating"]/map[genres[j]]["count"]).toFixed(2)}`);
        }
    }
}

function addToMap(map, genre, rating) {
    if(!map[genre]) {
        map[genre] = {
            rating: 0,
            count: 0
        }
    }
    map[genre]["rating"] += rating;
    map[genre]["count"]++;
}