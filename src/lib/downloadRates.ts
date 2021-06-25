import { resolve } from 'path';
import { DownloaderHelper } from 'node-downloader-helper';


const destination = resolve(__dirname, '..', '..', 'files');


const downloadRates = async (url: string) => {

  const dl = new DownloaderHelper(url, destination);

  dl.on('end', () => console.log('Download Completed'));
  dl.start();
}


export default downloadRates;