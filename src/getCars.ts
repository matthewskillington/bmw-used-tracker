import { Browser, Page } from "puppeteer";
import { VehicleListing } from "./types.js";

const getUsedBmwCars = async (browser: Browser): Promise<Array<VehicleListing>> => {
    const url = "https://usedcars.bmw.co.uk/result/?distance=140&max_supplied_price=28000&min_age=4&min_supplied_price=15000&series=1+Series&series=3+Series&size=100&sort=-placement_date&variant=140i&variant=340i&variant=320i&variant=330i"

    const page = await browser.newPage();

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
                id: id ? 'BMW' + id : null,
                name: name || '', 
                hasImages: hasImages,
                link: listingLink ? `${baseurl}${listingLink}` : 'not available'
            }
        })


        return baseDetails.filter(x => x.id != null);

    })
}

const getAutotraderCars = async (browser: Browser): Promise<Array<VehicleListing>> => {
    const url = "https://www.autotrader.co.uk/car-search?advertising-location=at_cars&fuel-type=Petrol&make=BMW&model=3%20Series&postcode=ng163rw&price-from=12000&price-to=30000&radius=100&sort=most-recent&transmission=Automatic&year-from=2014&year-to=2018"

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
    })


    return page.evaluate(() => {
        const quoteList = document.querySelectorAll('.sc-fFlnrN.fXMRrm')
        
        const baseDetails = Array.from(quoteList).map((listing) => {
            const qs = (selector: string) => listing.querySelector(selector);
            const baseurl = "https://www.autotrader.co.uk/"

            const id = qs('section.sc-iLsKjm')?.getAttribute('id');
            console.log('id', id);
            const name = qs('p.sc-dAlyuH')?.innerHTML;
            const images = qs('span.sc-fulCBj')?.innerHTML;
            const hasImages = Number(images) > 5;
            const listingLink = qs('a.search-listing-title')?.getAttribute('href')
            const isAd = !!qs('span.sc-cwHptR')

            return {
                id: id || null,
                name: name || '',
                hasImages: hasImages,
                link: listingLink ? `${baseurl}${listingLink}` : 'not available',
                isAd: isAd,
            }
        })
        
        return baseDetails.filter(x => x.id != null && !x.isAd);
    })

}

export const getCars = async (browser: Browser): Promise<Array<VehicleListing>> => {
    const [result1, result2] = await Promise.all([getUsedBmwCars(browser), getAutotraderCars(browser)]);
    const combined = [...result1, ...result2];

    console.log(result2)

    return combined;

}