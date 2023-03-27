import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import fs from 'fs';

// use your firebase config
const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const saveDataToFile = function (fileName, events) {
    const data = JSON.stringify(events);
    fs.writeFile(fileName + '.json', data, err => {
        if (err) {
            throw err
        }
        console.log('JSON data is saved in ' + fileName + ".json");
    })
}

const fetchData = async function(eventCollection) {
    const eventCollectionSnapShot = await getDocs(collection(db, eventCollection));
    let events = [];
    eventCollectionSnapShot.forEach(doc => events.push(doc.data()));
    saveDataToFile(eventCollection, events);
}

const fetchEvents = function(path) {
    try {
        if (!fs.existsSync(path+".json")) {
          fetchData(path);
        }
      } catch(err) {
        console.error(err)
      }
}
const eventCollectionArr = ["events", "events1", "eventsa", "eventsb", "eventsc", "eventsd"];

eventCollectionArr.forEach(eventType => {
    fetchEvents(eventType);
});