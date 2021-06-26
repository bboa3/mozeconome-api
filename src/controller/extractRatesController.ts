import { Request, Response } from 'express';
import { resolve } from "path";
import { DownloaderHelper } from 'node-downloader-helper';
import { PDFNet } from '@pdftron/pdfnet-node';
import getDateRates from '../lib/exchangeRates/getDate';

const ratesPath = resolve(__dirname, '..', '..', 'files', 'ZMMIREFR.pdf');
const dest = resolve(__dirname, '..', '..', 'files');
const url = 'https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf';

export default {
  async index(request: Request, response: Response) { 

    const dl = new DownloaderHelper(url, dest);

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

        const id = text.split('\n')[3].split(' ').join('').toLowerCase()
        const dateRates = getDateRates(text.split('\n')[2])

        const dolar = text.split('\n')[8];

        response.status(200).json({data: {
          id,
          date: dateRates,
          dolar: dolar
        }})
      }

      PDFNet.runWithCleanup(extractText).then(() => {

      }).catch(err => {
        response.status(400).json(err);
      })
    });

    dl.start();
  }
}