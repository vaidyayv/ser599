export function convertMoviesIntoIdMovies(movies) {
    let allMovies = {};
    let genres = Object.keys(movies);
    for(let i=0; i<genres.length; i++) {
        let genre = genres[i];
        let genreMovies = movies[genre];
        for(let j=0; j<genreMovies.length; j++) {
            let movie = genreMovies[j];
            movie["primaryGenre"] = genre;
            allMovies[movie["imdbID"]] = movie;
        }
    }
    return allMovies;
}