import { writeDataToFile } from "./fileSystem.js";
import { VehicleListing } from "./types.js";

export const storeCars = (cars: VehicleListing[]) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    writeDataToFile('../data/data.json', cars);
    writeDataToFile(`../data/${day}-${month}-${year}-${hours}${minutes}debug.json`, cars);
}