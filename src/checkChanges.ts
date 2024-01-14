import { readDataFromFile } from "./fileSystem.js";
import { VehicleListing } from "./types.js";

export const checkForChanges = async (cars: VehicleListing[]) => {
    const previousRecord = await readDataFromFile('data.json');

    const retrievedListings: VehicleListing[] = Array.isArray(previousRecord) ? 
    previousRecord.map((item: any) => ({... item, hasImages: !!item.hasImages})) : 
    [];
    
    const results = cars.map((currentCar) => {
        const previousListing = retrievedListings.find(x => x.id === currentCar.id)
        if(!previousListing){
            return {
                ...currentCar,
                isNewListing: true,
                hasAddedPhotos: currentCar.hasImages
            }
        }
        return {
            ...currentCar,
            isNewListing: false,
            hasAddedPhotos: !previousListing.hasImages && currentCar.hasImages,
        }
    })
    return results;
}