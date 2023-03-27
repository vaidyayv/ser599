import classes from "./movieDetails.module.css"
import {useState} from "react";
import Modal from "../modal/modal";
import { v4 as uuidv4 } from 'uuid';

function MovieDetails(props) {
    const movie = props.movie;
    const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
    const [modalState, setModalState] = useState(false);
    const watchMovieHandler = () => {
        if(!window.uuid) {
            let uuid = uuidv4();
            window.uuid = uuid;
        }
        fetch("https://blooming-wave-95457.herokuapp.com/addSelection?id=" + window.uuid + "&selectionId=" + movie["imdbID"] +"&exp="+window.experience);
        setModalState(true);
    }
    return (
        <div className= {classes.movieDetailsContainer}>
            <div className= {classes.detailsContainer}>
                <h1 className= {classes.title}>
                    {movie["Title"]}
                </h1>
                <h3>
                    Runtime: {movie["Runtime"]}
                </h3>
                <h3>
                    Language: {movie["Language"]}
                </h3>
                <h3>
                    Actor: {movie["Actors"]}
                </h3>
                <h3>
                    Director: {movie["Director"]}
                </h3>
                <p className={classes.plot}>
                    <span className={classes.plotName}>Plot: </span> 
                    {movie["Plot"]}
                </p>
                {
                    movie["Ratings"] && movie["Ratings"].map(rating => {
                        let color = colors[Math.floor(colors.length * Math.random())]
                        return (
                            <div className={classes.rating} style={{border: `1px solid ${color}`, color: color}}>
                                {rating["Source"]+': '+rating["Value"] }
                            </div>
                        );
                    })
                }
                <button
                    style={{
                        display: "block",
                        color: "white",
                        background: "blue",
                        border: "1px solid blue",
                        padding: "16px",
                        borderRadius: "32px",
                        marginTop: "16px",
                        fontSize: "medium",
                        cursor: "pointer"
                    }}
                    onClick = {watchMovieHandler}
                >I would like to watch this movie!</button>
            </div>
            <div className= {classes.posterContainer}>
                <img className= {classes.poster} src={movie["Poster"]} alt={movie["Title"]}  />
                <div className= {classes.shadow}></div>
            </div>

            {
                modalState && <Modal movieTitle = {movie["Title"]} />
            }
        </div>
    );
}

export default MovieDetails;