import classes from "./modal.module.css";

function Modal(props) {
    const movieTitle = props.movieTitle;
    return (
        <div className={classes.modalContainer}>
            <div className={classes.modalContent}>
                <div className={classes.text}>
                    So you'll be watching {movieTitle} next
                </div>
                <div className={classes.text}>
                    Awesome Choice!
                </div>
                <button
                    onClick={() => {
                        window.open(window.location.origin, "_self")
                        }
                    } 
                    className={classes.button}
                    >
                    Add More movies to bucket list?
                </button>
            </div>
        </div>
    );
}

export default Modal;