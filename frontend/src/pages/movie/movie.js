import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Recommendation from "../../components/movieList/recommendation/recommendation";
import MovieDetails from "../../components/movieDetails/movieDetails";
import classes from "./movie.module.css";
import { v4 as uuidv4 } from 'uuid';

function Movie() {
    const { id } = useParams()
    const [recommendations, setRecommendations] = useState([]);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch("https://blooming-wave-95457.herokuapp.com/loadMovie?id=" + id+"&exp="+window.experience)
            .then(res => res.json())
            .then(res => {
                if (res["status"] === "success") {
                    setRecommendations(res["data"]["recommendations"])
                    setMovie(res["data"]["movie"])
                    window.scrollTo(0, 0);
                }
            });
        if(!window.uuid) {
            let uuid = uuidv4();
            window.uuid = uuid;
        }
        fetch("https://blooming-wave-95457.herokuapp.com/addVisit?id=" + window.uuid + "&visitId=" + id +"&exp="+window.experience);
    }, [id])

    return (
        <div>
            <MovieDetails movie={movie} />
            <h3 className={classes.recommendationTitle}>More recommendations -></h3>
            <div className={classes.movieListContainer} >
                {
                    recommendations.map(recommendation => <Recommendation key={recommendation.imdbID} movie={recommendation} />)
                }
            </div>
        </div>
    )
}

export default Movie;