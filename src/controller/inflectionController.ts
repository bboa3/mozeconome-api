import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';
import xlsx from 'xlsx';

type YearInflection = {
  mensal: number[],
  homologa: number[]
}


export default {
  async index(request: Request, response: Response) {
    const { line } = request.body;
    const inflectionFile = request.file;

    if(!inflectionFile) {
      return response.status(400).json({error: 'You must provide inflection file'});
    }

    const filename = inflectionFile.filename; 
    const name = filename.split('-')[0];
    const year = filename.split('-')[1];

    
    const filePath = resolve(__dirname, '..', '..', 'files', filename);
    const dest = resolve(__dirname, '..', 'entity', 'inflection', `${name}.json`);

    const file = xlsx.readFile(filePath);

    const firstTabName = file.SheetNames[0];

    const data: any = xlsx.utils.sheet_to_json(file.Sheets[firstTabName], {
      blankrows: false,
      header: 1,
    });

    fs.readFile(dest, 'utf8', (err, file) => {
    if(err) return console.log(err);

      const inflection = JSON.parse(file);

      const infData: YearInflection = {

        mensal: data[7].filter((num: null | number) => {
          return num !== null && num !== 2016 && typeof num !== 'string'
        }),

        homologa: data[19].filter((num: null | number) => {
          return num !== null && num !== 2016 && typeof num !== 'string'
        }),
      }

      const updatedInflection = {
        `${year}`: infData,
      }
  
      
      // fs.writeFile(dest, JSON.stringify(updatedInflection), (err) => {
      //   if(err) return console.log(err);
      // })

    })

    response.send(data);
  }
}