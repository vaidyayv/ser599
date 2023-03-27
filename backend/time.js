import { findFirstVisitId, findGenre } from './findCoversionRates.js';

export function findAverageDurationSpentPerSessionPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let time = 0;
        let count = 0;
        for(let j=0; j<events.length; j++) {
            let event =  events[j];
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                time += findDuration(event);
                count++;
            }
        }
        console.log(`for ${files[i]}: average duration of session = ${(time/count).toFixed(2)} seconds`);   
    }
}

export function findAverageDurationSpentPerSessionPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let map = {};
        console.log(`\ngenre based average duration of session from ${files[i]}:`);
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                let time = findDuration(event);
                addToMap(map, genre, time)
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            let genre = genres[j];
            console.log(`${genres[j]}: average duration of session = ${(map[genre]["time"]/map[genre]["count"]).toFixed(2)} seconds`)
        }
    }
}

export function findAverageDurationSpentForSuccessPerSessionMoviePerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => event["selection"]);
        let time = 0;
        let count = 0;
        for(let j=0; j<events.length; j++) {
            let event =  events[j];
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                time += findDuration(event);
                count++;
            }
        }
        console.log(`for ${files[i]} successful sessions: average duration of session = ${(time/count).toFixed(2)} seconds`);   
    }
}

export function findAverageDurationSpentForSuccessPerSessionMoviePerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => event["selection"]);
        let map = {};
        console.log(`\ngenre based average duration of session from ${files[i]} for success:`);
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                let time = findDuration(event);
                addToMap(map, genre, time)
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            let genre = genres[j];
            console.log(`${genres[j]}: average duration of session = ${(map[genre]["time"]/map[genre]["count"]).toFixed(2)} seconds`)
        }
    }
}

export function findAverageDurationSpentForDroppedPerSessionMoviePerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => !event["selection"]);
        let time = 0;
        let count = 0;
        for(let j=0; j<events.length; j++) {
            let event =  events[j];
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                time += findDuration(event);
                count++;
            }
        }
        console.log(`for ${files[i]} failure: average duration of session = ${(time/count).toFixed(2)} seconds`);   
    }
}

export function findAverageDurationSpentForDroppedPerSessionMoviePerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => !event["selection"]);
        let map = {};
        console.log(`\ngenre based average duration of session from ${files[i]} for failure:`);
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                let time = findDuration(event);
                addToMap(map, genre, time)
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            let genre = genres[j];
            console.log(`${genres[j]}: average duration of session = ${(map[genre]["time"]/map[genre]["count"]).toFixed(2)} seconds`)
        }
    }
}

export function findAverageTimeSpentPerViewPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let time = 0;
        let count = 0;
        for(let j=0; j<events.length; j++) {
            let event =  events[j];
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                time += findDuration(event);
                count += visits.length;
            }
        }
        console.log(`for ${files[i]}: average duration per view = ${(time/count).toFixed(2)} seconds`);   
    }
}

export function findAverageTimeSpentPerViewPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let map = {};
        console.log(`\ngenre based average duration per view from ${files[i]}:`);
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                let time = findDuration(event);
                addToMapPerView(map, genre, time, visits.length)
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            let genre = genres[j];
            console.log(`${genres[j]}: average duration per view = ${(map[genre]["time"]/map[genre]["count"]).toFixed(2)} seconds`)
        }
    }
}

export function findAverageTimeSpentPerViewForSuccessPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => event["selection"]);
        let time = 0;
        let count = 0;
        for(let j=0; j<events.length; j++) {
            let event =  events[j];
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                time += findDuration(event);
                count += visits.length;
            }
        }
        console.log(`for ${files[i]} success: average duration per view = ${(time/count).toFixed(2)} seconds`);   
    }
}

export function findAverageTimeSpentPerViewForSuccessPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => event["selection"]);
        let map = {};
        console.log(`\ngenre based average duration per view from ${files[i]} for success:`);
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                let time = findDuration(event);
                addToMapPerView(map, genre, time, visits.length)
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            let genre = genres[j];
            console.log(`${genres[j]}: average duration per view = ${(map[genre]["time"]/map[genre]["count"]).toFixed(2)} seconds`)
        }
    }
}

export function findAverageTimeSpentPerViewForFailurePerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => !event["selection"]);
        let time = 0;
        let count = 0;
        for(let j=0; j<events.length; j++) {
            let event =  events[j];
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                time += findDuration(event);
                count += visits.length;
            }
        }
        console.log(`for ${files[i]} failure: average duration per view = ${(time/count).toFixed(2)} seconds`);   
    }
}

export function findAverageTimeSpentPerViewForFailurePerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => !event["selection"]);
        let map = {};
        console.log(`\ngenre based average duration per view from ${files[i]} for failure:`);
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            let visits = event["visits"] ?? [];
            if(visits.length > 0 && event["timestamp"] && findDuration(event) < 900) {
                let time = findDuration(event);
                addToMapPerView(map, genre, time, visits.length)
            }
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            let genre = genres[j];
            console.log(`${genres[j]}: average duration per view = ${(map[genre]["time"]/map[genre]["count"]).toFixed(2)} seconds`)
        }
    }
}

function findDuration(event) {
    let sortedVisits = event["visits"].sort((a,b) => a["timestamp"]["seconds"] - b["timestamp"]["seconds"]);
    let start = event["timestamp"]["seconds"];
    let end = sortedVisits[sortedVisits.length - 1]["timestamp"]["seconds"];
    if(event["selection"]) {
        end = event["selection"]["timestamp"]["seconds"];
    }
    return end-start;
}

function addToMap(map, genre, time) {
    if(!map[genre]) {
        map[genre] = {
            time: 0,
            count: 0
        }
    }
    map[genre]["time"] += time;
    map[genre]["count"]++;
}

function addToMapPerView(map, genre, time, count) {
    if(!map[genre]) {
        map[genre] = {
            time: 0,
            count: 0
        }
    }
    map[genre]["time"] += time;
    map[genre]["count"] += count;
}