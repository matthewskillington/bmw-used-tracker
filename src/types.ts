export interface VehicleListing  {
    id: string | null
    name: string,
    hasImages: boolean,
    link: string,
}

export interface VehicleListingCheck extends VehicleListing  {
    isNewListing: boolean,
    hasAddedPhotos: boolean,
}