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

    const filePath = resolve(__dirname, '..', '..', 'files', 'inhambane.xlsx');
    const dest = resolve(__dirname, '..', 'entity', 'inflection', 'inhambane.json');

    const file = xlsx.readFile(filePath);

    const firstTabName = file.SheetNames[0];

    const data: any = xlsx.utils.sheet_to_json(file.Sheets[firstTabName], {
      blankrows: false,
      header: 1,
    });

    fs.readFile(dest, 'utf8', (err, file) => {
    if(err) return console.log(err);

      const inflection = JSON.parse(file);

      const i2016: YearInflection = {

        mensal: data[7].filter((num: null | number) => {
          return num !== null && num !== 2016 && typeof num !== 'string'
        }),

        homologa: data[19].filter((num: null | number) => {
          return num !== null && num !== 2016 && typeof num !== 'string'
        }),
      }

      const i2017: YearInflection = {
        mensal: data[8].filter((num: null | number) => {
          return num !== null && num !== 2017 && typeof num !== 'string'
        }),

        homologa: data[20].filter((num: null | number) => {
          return num !== null && num !== 2017 && typeof num !== 'string'
        }),
      }

      const i2018: YearInflection = {
        mensal: data[9].filter((num: null | number) => {
          return num !== null && num !== 2018 && typeof num !== 'string'
        }),

        homologa: data[21].filter((num: null | number) => {
          return num !== null && num !== 2018 && typeof num !== 'string'
        }),
      }

      const i2019: YearInflection = {
        mensal: data[10].filter((num: null | number) => {
          return num !== null && num !== 2019 && typeof num !== 'string'
        }),

        homologa: data[22].filter((num: null | number) => {
          return num !== null && num !== 2019 && typeof num !== 'string'
        }),
      }

      const i2020: YearInflection = {
        mensal: data[11].filter((num: null | number) => {
          return num !== null && num !== 2020 && typeof num !== 'string'
        }),

        homologa: data[23].filter((num: null | number) => {
          return num !== null && num !== 2020 && typeof num !== 'string'
        }),
      }

      const i2021: YearInflection = {
        mensal: data[12].filter((num: null | number) => {
          return num !== null && num !== 2021 && typeof num !== 'string'
        }),

        homologa: data[24].filter((num: null | number) => {
          return num !== null && num !== 2021 && typeof num !== 'string'
        }),
      }

      const updatedInflection = {
        '2016': i2016, 
        '2017': i2017,
        '2018': i2018,
        '2019': i2019,
        '2020': i2020,
        '2021': i2021
      }
    
      fs.writeFile(dest, JSON.stringify(updatedInflection), (err) => {
        if(err) return console.log(err);
      })

    })

    response.send(data);
  }
}