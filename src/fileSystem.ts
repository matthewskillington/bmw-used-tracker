import { Storage } from '@google-cloud/storage';
import { PassThrough } from 'stream';

const bucketName = 'used-bmw-data'
const fileName = 'data.json'

export const writeDataToCloudStorage = async (data: any) => {
  const storage = new Storage();
  const myBucket = storage.bucket(bucketName);
  const file = myBucket.file(fileName);

  const pst = new PassThrough();
  pst.write(JSON.stringify(data))
  pst.end();

  async function streamFileUpload() {
    pst.pipe(file.createWriteStream()).on('finish', () => {
      console.log('file uploaded');
    })
  }
  streamFileUpload().catch(console.error);
}

export const readDataFromCloudStorage = async () => {
  const storage = new Storage();

  async function downloadIntoMemory() {
    const contents = await storage.bucket(bucketName).file(fileName).download();
    return JSON.parse(contents.toString());
  }

  return await downloadIntoMemory().catch(console.error);
}
