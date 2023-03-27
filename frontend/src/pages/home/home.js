import Layout from "../../components/layout/layout";
import MovieList from "../../components/movieList/movieList";
import classes from "./home.module.css";

function Home() {

    return (
        <Layout>
            <div className={classes.header} >
                <h1>
                    Select any movie at random and stop when you find next movie to watch
                </h1>
            </div>
            <MovieList />
        </Layout>
    )
}

export default Home;