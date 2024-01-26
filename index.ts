import puppeteer from "puppeteer";
import { getCars } from "./src/getCars.js";
import { storeCars } from "./src/storeCars.js";
import { checkForChanges } from "./src/checkChanges.js";
import { sendNotification } from "./src/sendNotification.js";

export const entry = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    })

    const cars = await getCars(browser);

    const results = await checkForChanges(cars);

    const newListings = results.filter(x => x.isNewListing || x.hasAddedPhotos);
    if(newListings.length > 0) {
        newListings.map(x => {
            if(!x.isNewListing && x.hasAddedPhotos) {
                sendNotification(`New photos have been added to ${x.link}`)
            } else if(x.isNewListing && x.hasAddedPhotos){
                sendNotification(`New listing added with photos ${x.link}`)
            } else if (x.isNewListing && !x.hasAddedPhotos){
                sendNotification(`New listing added, but no photos yet ${x.link}`)
            } else{
                sendNotification(`Something changed on ${x.link}`)
            }
        })
        console.log('New listings or photos added since last save!')
        console.log(newListings)
    } else {
        console.log('No updates since last time')
    }

    await browser.close();
}

 //entry() 