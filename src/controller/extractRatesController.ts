import { Request, Response } from 'express';
import { resolve } from "path";
import { DownloaderHelper } from 'node-downloader-helper';
import { PDFNet } from '@pdftron/pdfnet-node';
import getDateRates from '../lib/exchangeRates/getDate';
import usdRates from '../lib/exchangeRates/usd';
import zarRates from '../lib/exchangeRates/zar';
import aedRates from '../lib/exchangeRates/aed';
import audRates from '../lib/exchangeRates/aud';
import brlRates from '../lib/exchangeRates/brl';
import bwpRates from '../lib/exchangeRates/bwp';
import cadRates from '../lib/exchangeRates/cad';
import chfRates from '../lib/exchangeRates/chf';
import cnyRates from '../lib/exchangeRates/cny';
import dkkRates from '../lib/exchangeRates/dkk';
import eurRates from '../lib/exchangeRates/eur';
import gbpRates from '../lib/exchangeRates/gbp';
import kwdRates from '../lib/exchangeRates/kwd';
import murRates from '../lib/exchangeRates/mur';
import nokRates from '../lib/exchangeRates/nok';
import nzdRates from '../lib/exchangeRates/nzd';
import sdrRates from '../lib/exchangeRates/sdr';
import sekRates from '../lib/exchangeRates/sek';
import zmwRates from '../lib/exchangeRates/zmw';

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

        response.status(200).json({ data: {
          id,
          date: dateRates,
          usd: usdRates(text),
          zar: zarRates(text),
          aed: aedRates(text),
          aud: audRates(text),
          brl: brlRates(text),
          bwp: bwpRates(text),
          cad: cadRates(text),
          chf: chfRates(text),
          chy: cnyRates(text),
          dkk: dkkRates(text),
          eur: eurRates(text),
          gbp: gbpRates(text),
          kwd: kwdRates(text),
          mur: murRates(text),
          nok: nokRates(text),
          nzd: nzdRates(text),
          sdr: sdrRates(text),
          sek: sekRates(text),
          zmw: zmwRates(text),
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