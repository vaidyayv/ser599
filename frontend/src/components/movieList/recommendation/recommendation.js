import classes from "./recommendation.module.css"
import { Link } from "react-router-dom";

function Recommendation(props) {
    let movie = props.movie;
    return (
        <Link to={"/movie/"+movie["imdbID"]} className={classes.movieContainer} >
            <div className={classes.elevationDemoSurface} style={{
                backgroundImage: `url("` + movie["Poster"] + `")`
            }}>
                <p className={classes.title} >
                    {movie["Title"]}
                </p>
            </div>
        </Link>
    );
}

export default Recommendation;