import puppeteer from "puppeteer";
import { getCars } from "./src/getCars.js";

const url = "https://usedcars.bmw.co.uk/result/?max_supplied_price=28000&min_age=4&min_supplied_price=15000&series=1+Series&series=3+Series&sort=-placement_date&variant=140i&variant=340i&variant=320i&variant=330i"

const entry = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    })

    const page = await browser.newPage();

    const cars = await getCars(page, url);


    //TODO: Go to the vehicle page and get extra information
    // const fullDetails = await Promise.all(cars.map(async (car: VehicleListing) => {

    // }))

    // Remove any without an id (in 'you may like section')
    const filtered = cars.filter(x => !!x.id)

    console.log(filtered);

    await browser.close();

}

entry()