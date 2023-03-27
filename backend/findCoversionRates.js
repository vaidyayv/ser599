export function findCoversionRatesPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let successfulCount = 0;
        for (let j = 0; j < events.length; j++) {
            if (events[j]["selection"]) {
                successfulCount++;
            }
        }
        console.log(`for ${files[i]}, conversion rate = ${((successfulCount * 100)/events.length).toFixed(2)}%`);
    }
}

export function findCoversionRatesPerExperimentPerGenre(allMovies, files, data) {
    for (let i = 0; i < files.length; i++) {
        console.log(`\ngenre based conversion rates from ${files[i]}:`);
        let events = data[i];
        let map = {};
        for (let j=0; j<events.length; j++) {
            let event = events[j];
            let firstVisitId = findFirstVisitId(event["visits"]);
            const genre = findGenre(allMovies, firstVisitId);
            addToMap(map, genre, !!event["selection"])
        }
        let genres = Object.keys(map);
        for(let j=0; j<genres.length; j++) {
            console.log(`${genres[j]}: ${((map[genres[j]]["success"]*100)/map[genres[j]]["total"]).toFixed(2)}%`)
        }
    }
}

export function findFirstVisitId(visits) {
    if(!visits) {
        return "unknown";
    }
    return visits.sort((a,b) => a["timestamp"]["seconds"] - b["timestamp"]["seconds"])[0]["id"];
}

export function findGenre(allMovies, id) {
    let primaryGenre = allMovies?.[id]?.["primaryGenre"];
    if(!primaryGenre) {
        return "unknown";
    }
    return primaryGenre;
}

function addToMap(map, genre, success) {
    if(!map[genre]) {
        map[genre] = {
            success: 0,
            total: 0
        }
    }
    if(success) {
        map[genre]["success"]++;
    }
    map[genre]["total"]++;
}