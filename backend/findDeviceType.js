export function findDeviceTypePercentagesPerExperiment(files, data) {
    for (let i = 0; i < files.length; i++) {
        let events = data[i];
        let smallCount = 0;
        let mediumCount = 0;
        let largeCount = 0;
        let unknownCount = 0;
        for (let j = 0; j < events.length; j++) {
            switch(events[j]["deviceType"]) {
                case "small":
                    smallCount++;
                    break;
                case "medium":
                    mediumCount++;
                    break;
                case "large":
                    largeCount++;
                    break;
                default:
                    unknownCount++;
            }
        }
        console.log(`for ${files[i]}, following devices were used:`);
        console.log(`small device: ${((smallCount*100)/events.length).toFixed(2)}%`);
        console.log(`medium device: ${((mediumCount*100)/events.length).toFixed(2)}%`);
        console.log(`large device: ${((largeCount*100)/events.length).toFixed(2)}%`);
        console.log(`unknown device: ${((unknownCount*100)/events.length).toFixed(2)}% \n`);
    }
}