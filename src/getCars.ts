import { Page } from "puppeteer";
import { VehicleListing } from "./types.js";

export const getCars = async (page: Page, url: string): Promise<Array<VehicleListing>> => {
    await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 60000
    });

    return page.evaluate(() => {
        const quoteList = document.querySelectorAll(".uvl-c-adverts-list .uvl-c-advert");

        const baseDetails = Array.from(quoteList).map((listing) => {
            const qs = (selector: string) => listing.querySelector(selector);
            const baseurl = "https://usedcars.bmw.co.uk"
            
            const id = listing.getAttribute('id');
            const name = qs('.uvl-c-overview-card__title a')?.innerHTML

            const images = qs('.uvl-c-advert__count .uvl-o-count__text')?.innerHTML
            const hasImages = Number(images) > 8
            const listingLink = qs('.uvl-c-overview-card__title a')?.getAttribute('href')

            return {
                id: id,
                name: name || '', 
                hasImages: hasImages,
                link: listingLink ? `${baseurl}${listingLink}` : 'not available'
            }
        })


        return baseDetails;

    })
}