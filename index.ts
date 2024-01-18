import puppeteer from "puppeteer";
import { getCars } from "./src/getCars.js";
import { storeCars } from "./src/storeCars.js";
import { checkForChanges } from "./src/checkChanges.js";
import { sendNotification } from "./src/sendNotification.js";

const url = "https://usedcars.bmw.co.uk/result/?max_supplied_price=28000&min_age=4&min_supplied_price=15000&series=1+Series&series=3+Series&size=50&sort=-placement_date&variant=140i&variant=340i&variant=320i&variant=330i"

export const entry = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    })

    const page = await browser.newPage();

    const cars = await getCars(page, url);

    const filtered = cars.filter(x => !!x.id)

    const results = await checkForChanges(filtered);

    const newListings = results.filter(x => x.isNewListing || x.hasAddedPhotos);
    if(newListings.length > 0) {
         console.log('New listings or photos added since last save!')
         console.log(newListings)
         sendNotification(`New listings or photos have been posted! ${newListings.map(x => x.link + '  ')}`)

    } else {
        console.log('No updates since last time')
    }

    storeCars(filtered);

    await browser.close();

}

 //entry() 