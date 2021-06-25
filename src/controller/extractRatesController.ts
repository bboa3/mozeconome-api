import { Request, Response } from 'express';
import { resolve } from "path";
import { PDFNet } from '@pdftron/pdfnet-node';
import downloadRates from "../lib/downloadRates";

const ratesPath = resolve(__dirname, '..', '..', 'files', 'ZMMIREFR.pdf')

export default {
  async index(request: Request, response: Response) { 

    await downloadRates('https://www.bancomoc.mz/Files/REFR/ZMMIREFR.pdf');
    
    const extractText = async () => {

      const doc = await PDFNet.PDFDoc.createFromFilePath(ratesPath);
      await doc.initSecurityHandler();

      const page = await doc.getPage(1);
      if(!page)
      return console.log('No page found');


      const txt = await PDFNet.TextExtractor.create();

      const rect = new PDFNet.Rect(0, 0, 612, 794);

      txt.begin(page, rect);

      const text = await txt.getAsText();

      response.status(200).json({data: text})
    }

    PDFNet.runWithCleanup(extractText).then(() => {

    }).catch(err => {
      response.status(400).json(err);
    })
  }
}