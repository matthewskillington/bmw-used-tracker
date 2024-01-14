import { writeDataToFile } from "./fileSystem.js";
import { VehicleListing } from "./types.js";

export const storeCars = (cars: VehicleListing[]) => {
    writeDataToFile('data.json', cars);
}