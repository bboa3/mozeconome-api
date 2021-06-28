import { resolve } from "path";
import { DownloaderHelper } from 'node-downloader-helper';
import { PDFNet } from '@pdftron/pdfnet-node';
import getDateRates from '../exchangeRates/getDate';
import runAgaInOneHour from './runAgainOneHour';
import findRatesInfo from '../../entity/exchangeRates/findRatesInfo';
import saveExchangeRates, { ExchangeRates } from '../../entity/exchangeRates/saveExchangeRates';
import getExchangeRates from '../exchangeRates/getExchangeRates';

import CreateMessage from './errorMail';
import sendMail from "../../services/sendMail";



const ratesPath = resolve(__dirname, '..', '..', '..', 'files', 'ZMMIREFR.pdf');
const dest = resolve(__dirname, '..', '..', '..', 'files');
const url = 'https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf'


const bancomocRates = () => {
  const dl = new DownloaderHelper(url, dest, {
    retry: {
      maxRetries: 3,
      delay: 1000
    },
    override: false
  });
  
  dl.on('retry', () => {
    
    const msg = CreateMessage({
      code: 'BancomocDownloadRetry',
      error: 'Não foi possível fazer o download do arquivo https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf'
    })
    sendMail(msg);

  })
  dl.on('error', (err) => {
    
    const msg = CreateMessage({
      code: 'BancomocDownloadError',
      error: 'Não foi possível fazer o download do arquivo https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf'
    })
    
    sendMail(msg);

  })
  
  dl.on('end', () => {
    const extractText = async () => {
      
      const doc = await PDFNet.PDFDoc.createFromFilePath(ratesPath);
      await doc.initSecurityHandler();
      
      const page = await doc.getPage(1);
      if(!page)
      return console.log('page not found');
      
      const txt = await PDFNet.TextExtractor.create();
      
      const rect = new PDFNet.Rect(0, 0, 612, 794);
      
      txt.begin(page, rect);
      
      const text = await txt.getAsText();
      
      const id = text.split('\n')[3].split(' ').join('').toLowerCase();
      const dateRates = getDateRates(text.split('\n')[2]);
      
      const ratesInfo = await findRatesInfo(id);
      
      if(ratesInfo) {
        return runAgaInOneHour(dl);
      } 
      
      const exchangeRates: ExchangeRates = {
        ratesId: id,
        date: dateRates,
        rates: getExchangeRates(text)
      }
      
      await saveExchangeRates(exchangeRates);
    }
    
    PDFNet.runWithCleanup(extractText).then(() => {
      
    }).catch(err => {

      const msg = CreateMessage({
        code: 'BancomocDownloadReading',
        error: `
          Erro lendo o arquivo https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf

          Error: ${String(err)}
        `
      })
      sendMail(msg);

    })
  });
  
  dl.start();
}

export default bancomocRates;