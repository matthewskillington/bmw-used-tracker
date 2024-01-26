import { readDataFromCloudStorage } from "./fileSystem.js";
import { storeCars } from "./storeCars.js";
import { VehicleListing, VehicleListingCheck } from "./types.js";

export const checkForChanges = async (cars: VehicleListing[]): Promise<VehicleListingCheck[]> => {
    const previousRecord = await readDataFromCloudStorage();

    const retrievedListings: VehicleListing[] = Array.isArray(previousRecord) ? 
    previousRecord.map((item: any) => ({...item, hasImages: !!item.hasImages})) : 
    [];

    // We need to join the current and previous listings before restoring them as sometimes listings dont load
    // and then are incorrectly reported as new on the next run
    const updatedRecord = [...retrievedListings, ...cars];
    const reducedRecord = [...new Map(updatedRecord.map(x => [x.id, x])).values()]
    storeCars(reducedRecord)

    const newListings = cars.map((currentCar) => {
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
    return newListings;
}