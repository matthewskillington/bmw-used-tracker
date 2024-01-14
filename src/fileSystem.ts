import fs from 'fs/promises';

const writeDataToFile = async (fileName: string, data: any) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(data));
    console.log('Data written to file successfully.');
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

const readDataFromFile = async (fileName: string) => {
  try {
    const fileContent = await fs.readFile(fileName);
    return JSON.parse(fileContent as any);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return null;
  }
};

export { writeDataToFile, readDataFromFile };