import { promises as fs } from "fs";

import { findDeviceTypePercentagesPerExperiment } from './findDeviceType.js';
import { findCoversionRatesPerExperiment, findCoversionRatesPerExperimentPerGenre } from './findCoversionRates.js';
import {
    findAverageNumberOfVisitsPerExperiment,
    findAverageNumberOfVisitsPerExperimentPerGenre,
    findAverageNumberOfVisitsForConversionPerExperiment,
    findAverageNumberOfVisitsForConversionPerExperimentPerGenre,
    findAverageNumberOfVisitsForDropOffPerExperiment,
    findAverageNumberOfVisitsForDropOffPerExperimentPerGenre
} from './numberOfVisits.js'
import {
    findAverageIMDBRatingOfSessionPerExperiment,
    findAverageIMDBRatingOfSessionPerExperimentPerGenre,
    findAverageIMDBRatingOfSessionWhenMovieIsSelectedPerExperiment,
    findAverageIMDBRatingOfSessionWhenMovieIsSelectedPerExperimentPerGenre,
    findAverageIMDBRatingOfSessionWhenMovieIsntSelectedPerExperiment,
    findAverageIMDBRatingOfSessionWhenMovieIsntSelectedPerExperimentPerGenre
} from "./rating.js"
import {
    findAverageDurationSpentPerSessionPerExperiment,
    findAverageDurationSpentPerSessionPerExperimentPerGenre,
    findAverageDurationSpentForSuccessPerSessionMoviePerExperiment,
    findAverageDurationSpentForSuccessPerSessionMoviePerExperimentPerGenre,
    findAverageDurationSpentForDroppedPerSessionMoviePerExperiment,
    findAverageDurationSpentForDroppedPerSessionMoviePerExperimentPerGenre,
    findAverageTimeSpentPerViewPerExperiment,
    findAverageTimeSpentPerViewPerExperimentPerGenre,
    findAverageTimeSpentPerViewForSuccessPerExperiment,
    findAverageTimeSpentPerViewForSuccessPerExperimentPerGenre,
    findAverageTimeSpentPerViewForFailurePerExperiment,
    findAverageTimeSpentPerViewForFailurePerExperimentPerGenre
} from './time.js'

import { convertMoviesIntoIdMovies } from './transform.js';

const readFile = async function (name) {
    const events = await fs.readFile(name + ".json", "utf8");
    return events;
}

let files = ["eventsa", "eventsb", "eventsc", "eventsd", "movies"];

let dataPromises = await files.map(async file => {
    const events = await readFile(file)
    return JSON.parse(events);
});

let data = [];

let movies = [];

Promise.all(dataPromises).then(promisedData => {
    data = promisedData;
    movies = data.pop();
    files.pop();
    compute();
});

const compute = function () {

    // transforms

    //transformMoviesIntoIdBasedStructure
    let allMovies = convertMoviesIntoIdMovies(movies);

    // ---------------------------------------1. device -------------------------------------------------------
    findDeviceTypePercentagesPerExperiment(files, data);
    console.log("<------------------------------------------->")

    // ---------------------------------------2. conversion rate ----------------------------------------------
    // conversion rate
    findCoversionRatesPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findCoversionRatesPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // ---------------------------------------3. number of visits ----------------------------------------------
    // average number of visits
    findAverageNumberOfVisitsPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageNumberOfVisitsPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average number of visits for success
    findAverageNumberOfVisitsForConversionPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageNumberOfVisitsForConversionPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average number of visits for failure
    findAverageNumberOfVisitsForDropOffPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageNumberOfVisitsForDropOffPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // ---------------------------------------4. rating -------------------------------------------------------
    // average iMDB rating
    findAverageIMDBRatingOfSessionPerExperiment(allMovies, files, data);
    console.log("<------------------------------------------->")
    findAverageIMDBRatingOfSessionPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average iMDB rating for success
    findAverageIMDBRatingOfSessionWhenMovieIsSelectedPerExperiment(allMovies, files, data);
    console.log("<------------------------------------------->")
    findAverageIMDBRatingOfSessionWhenMovieIsSelectedPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average iMDB rating for failure
    findAverageIMDBRatingOfSessionWhenMovieIsntSelectedPerExperiment(allMovies, files, data);
    console.log("<------------------------------------------->")
    findAverageIMDBRatingOfSessionWhenMovieIsntSelectedPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // ---------------------------------------5. time ---------------------------------------------------------
    // average time spent
    findAverageDurationSpentPerSessionPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageDurationSpentPerSessionPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average time spent on selected movie view session
    findAverageDurationSpentForSuccessPerSessionMoviePerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageDurationSpentForSuccessPerSessionMoviePerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average time spent on not selected movie view session
    findAverageDurationSpentForDroppedPerSessionMoviePerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageDurationSpentForDroppedPerSessionMoviePerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average time spent per view
    findAverageTimeSpentPerViewPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageTimeSpentPerViewPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average time spent per view for success
    findAverageTimeSpentPerViewForSuccessPerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageTimeSpentPerViewForSuccessPerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")

    // average time spent per view for failulre
    findAverageTimeSpentPerViewForFailurePerExperiment(files, data);
    console.log("<------------------------------------------->")
    findAverageTimeSpentPerViewForFailurePerExperimentPerGenre(allMovies, files, data);
    console.log("<------------------------------------------->")
}