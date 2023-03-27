import { findFirstVisitId, findGenre } from './findCoversionRates.js';

export function findAverageNumberOfVisitsPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let visitsCount = 0;
        let countedEvents = 0;
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            if(visits.length <=10) {
                countedEvents++;
                visitsCount += visits.length + 1;
            }
            
        }
        console.log(`${files[i]}: average views per session = ${(visitsCount/countedEvents).toFixed(2)}`);
    }
}

export function findAverageNumberOfVisitsPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based number of clicks from ${files[i]}:`);
        let events = data[i];
        let map = {};
        for (let j = 0; j < events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            addToMap(map, genre, (event["visits"] ?? []).length);
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: average views per session = ${(map[genres[j]]["visitCount"]/map[genres[j]]["eventCount"]).toFixed(2)}`);
        }
    }
}

export function findAverageNumberOfVisitsForConversionPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => event["selection"]);
        let visitsCount = 0;
        let countedEvents = 0;
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            if(visits.length <=10) {
                countedEvents++;
                visitsCount += visits.length + 1;
            }
        }
        console.log(`${files[i]}: average views per successful session = ${(visitsCount/countedEvents).toFixed(2)}`);    }
}

export function findAverageNumberOfVisitsForConversionPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based number of clicks from ${files[i]} successful sessions:`);
        let events = data[i].filter(event => event["selection"]);
        let map = {};
        for (let j = 0; j < events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            addToMap(map, genre, (event["visits"] ?? []).length);
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: average views per session = ${(map[genres[j]]["visitCount"]/map[genres[j]]["eventCount"]).toFixed(2)}`);
        }
    }
}

export function findAverageNumberOfVisitsForDropOffPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i].filter(event => !event["selection"]);
        let visitsCount = 0;
        let countedEvents = 0;
        for (let j = 0; j < events.length; j++) {
            let visits = events[j]["visits"] ?? [];
            if(visits.length <=10) {
                countedEvents++;
                visitsCount += visits.length + 1;
            }
        }
        console.log(`${files[i]}: average views per dropped session = ${(visitsCount/countedEvents).toFixed(2)}`);
    }
}

export function findAverageNumberOfVisitsForDropOffPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based number of clicks from ${files[i]} dropped sessions:`);
        let events = data[i].filter(event => !event["selection"]);
        let map = {};
        for (let j = 0; j < events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            addToMap(map, genre, (event["visits"] ?? []).length);
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: average views per session = ${(map[genres[j]]["visitCount"]/map[genres[j]]["eventCount"]).toFixed(2)}`);
        }
    }
}

function addToMap(map, genre, visitCount) {
    if(visitCount <= 10) {
        if(!map[genre]) {
            map[genre] = {
                visitCount: 0,
                eventCount: 0
            }
        }
        map[genre]["visitCount"] += visitCount;
        map[genre]["eventCount"]++;
    }
    
}