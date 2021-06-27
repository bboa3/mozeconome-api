import { Request, Response } from 'express';
import { resolve } from "path";
import { DownloaderHelper } from 'node-downloader-helper';
import { PDFNet } from '@pdftron/pdfnet-node';
import getDateRates from '../lib/exchangeRates/getDate';
import runAgaInOneHour from '../lib/schadules/runAgainOneHour';
import findRatesInfo from '../entity/exchangeRates/findRatesInfo';
import saveExchangeRates, { ExchangeRates } from '../entity/exchangeRates/saveExchangeRates';
import getExchangeRates from '../lib/exchangeRates/getExchangeRates';



const ratesPath = resolve(__dirname, '..', '..', 'files', 'ZMMIREFR.pdf');
const dest = resolve(__dirname, '..', '..', 'files');
const url = 'https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf';



export default {
  async index(request: Request, response: Response) { 

    const dl = new DownloaderHelper(url, dest, {
      retry: {
        maxRetries: 3,
        delay: 3600000
      },
      override: true
    });

    dl.on('retry', () => {
      // send me email to notify download error
    })
    dl.on('error', (err) => {
      // send me email to notify download error
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
        // send me email to notify error reading file
      })
    });

    dl.start();
  }
}