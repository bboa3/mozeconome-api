import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';
import xlsx from 'xlsx';
import isRawNumber from '../validations/rawNumber';

type Inflation = {
  year: number
  mensal: number[],
  homologa: number[]
}

export default {
  async create(request: Request, response: Response) {
    const { mensalRawNumber, homologaRawNumber } = request.body;
    const inflationFile = request.file;

    if(!inflationFile) {
      return response.status(400).json({error: 'You must provide inflation file'});
    }

    await isRawNumber.rawNumber({mensalRawNumber, homologaRawNumber});

    const filename = inflationFile.filename; 
    const name = filename.split('-')[0];
    const year = filename.split('-')[1].split('.')[0];

    
    const filePath = resolve(__dirname, '..', '..', 'files', filename);
    const dest = resolve(__dirname, '..', '..', 'files', 'inflation', `${name}.json`);

    const file = xlsx.readFile(filePath);

    const firstTabName = file.SheetNames[0];
    
    const data: any = xlsx.utils.sheet_to_json(file.Sheets[firstTabName], {
      blankrows: false,
      header: 1,
    });

    fs.readFile(dest, 'utf8', (err, file) => {
      if(err) return response.status(500).json(err);

      const parsedFile = JSON.parse(file);
      const total: Inflation[] = parsedFile.total;

      const totalInflation = total.map((inflationOneYear) => {  

        if(inflationOneYear.year === Number(year)) {
          
          return {
            year: Number(year),

            mensal: data[mensalRawNumber].filter((num: number | null) => {
              return num !== null && num !== Number(year) && typeof num !== 'string'
            }),
  
            homologa: data[homologaRawNumber].filter((num: null | number) => {
              return num !== null && num !== Number(year) && typeof num !== 'string'
            }),
          }
        } else {
          return inflationOneYear
        }
      })

      const inflationData = {...parsedFile, total: totalInflation}  
      
      fs.writeFile(dest, JSON.stringify(inflationData), (err) => {
        if(err) return response.status(500).json(err);
      })

      fs.unlink(filePath, (err) => {
        if(err) return response.status(500).json(err);
      })

      response.status(200).json(inflationData);
    })
  }
}