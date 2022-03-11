import { Request, Response } from 'express';
import fs from 'fs/promises';
import { resolve } from 'path';
import xlsx from 'xlsx';

export default {
  async create(request: Request, response: Response) {
    const inflationFile = request.file;

    if(!inflationFile) {
      return response.status(400).json({error: 'You must provide inflation file'});
    }

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

    const ipcFilter = (IPCs: any) => (year: number) => {
      const ipcS = IPCs.filter((num: number | null) => {
        return num !== null && num !== Number(year) && typeof num !== 'string'
      })

      return {
        Jan: ipcS[0],
        Fev: ipcS[1],
        Mar: ipcS[2],
        Abr: ipcS[3],
        Mai: ipcS[4],
        Jun: ipcS[5],
        Jul: ipcS[6],
        Ago: ipcS[7],
        Set: ipcS[8],
        Out: ipcS[9],
        Nov: ipcS[10],
        Dez: ipcS[11],
      }
    }

    const totalIPC = {
      2016: ipcFilter(data[1])(2016),
      2017: ipcFilter(data[2])(2017),
      2018: ipcFilter(data[3])(2018),
      2019: ipcFilter(data[4])(2019),
      2020: ipcFilter(data[5])(2020),
      2021: ipcFilter(data[6])(2021),
      2022: ipcFilter(data[7])(2022),
    }

    try {
      const parsedFile = JSON.parse(await fs.readFile(dest, 'utf8'))
      parsedFile.total = totalIPC
        
      await fs.writeFile(dest, JSON.stringify(parsedFile))

      await fs.unlink(filePath)

      response.status(200).json(totalIPC);
      
    } catch (err) {
      response.status(500).json(err)
    }
  }
}
