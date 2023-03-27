import classes from "./movieList.module.css"
import { useEffect, useState } from "react";
import Recommendation from "./recommendation/recommendation";

function MovieList() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://blooming-wave-95457.herokuapp.com/loadInitialRecommendation?exp="+window.experience)
            .then(res => res.json())
            .then(res => {
                if (res["status"] == "success") {
                    setMovies(res["data"]["recommendations"])
                }
            })
    }, [])

    return (
        <div className={classes.movieListContainer}>
            {
                movies.map(movie => <Recommendation key={movie.imdbID} movie={movie} />)
            }
        </div>
    );
}

export default MovieList;