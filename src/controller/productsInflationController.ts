import { Request, Response } from 'express';
import fs from 'fs/promises';
import { resolve } from 'path';
import xlsx from 'xlsx';

export default {
  async create(request: Request, response: Response) {
    const { } = request.body;
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

    const firstTabName = file.SheetNames[1];
    
    const data: any = xlsx.utils.sheet_to_json(file.Sheets[firstTabName], {
      blankrows: false,
      header: 1,
    })

    const ipcFilter = (IPCs: any) => {
      const ipcS = IPCs.filter((num: number | null) => {
        return num !== null && typeof num !== 'string'
      })

      return {
        2016: {
          Jan: ipcS[6],
          Fev: ipcS[7],
          Mar: ipcS[8],
          Abr: ipcS[9],
          Mai: ipcS[10],
          Jun: ipcS[11],
          Jul: ipcS[12],
          Ago: ipcS[13],
          Set: ipcS[14],
          Out: ipcS[15],
          Nov: ipcS[16],
          Dez: ipcS[17],
        },
        2017: {
          Jan: ipcS[18],
          Fev: ipcS[19],
          Mar: ipcS[20],
          Abr: ipcS[21],
          Mai: ipcS[22],
          Jun: ipcS[23],
          Jul: ipcS[24],
          Ago: ipcS[25],
          Set: ipcS[26],
          Out: ipcS[27],
          Nov: ipcS[28],
          Dez: ipcS[29],
        },
        2018: {
          Jan: ipcS[30],
          Fev: ipcS[31],
          Mar: ipcS[32],
          Abr: ipcS[33],
          Mai: ipcS[34],
          Jun: ipcS[35],
          Jul: ipcS[36],
          Ago: ipcS[37],
          Set: ipcS[38],
          Out: ipcS[39],
          Nov: ipcS[40],
          Dez: ipcS[41],
        },
        2019: {
          Jan: ipcS[42],
          Fev: ipcS[43],
          Mar: ipcS[44],
          Abr: ipcS[45],
          Mai: ipcS[46],
          Jun: ipcS[47],
          Jul: ipcS[48],
          Ago: ipcS[49],
          Set: ipcS[50],
          Out: ipcS[51],
          Nov: ipcS[52],
          Dez: ipcS[53],
        },
        2020: {
          Jan: ipcS[54],
          Fev: ipcS[55],
          Mar: ipcS[56],
          Abr: ipcS[57],
          Mai: ipcS[58],
          Jun: ipcS[59],
          Jul: ipcS[60],
          Ago: ipcS[61],
          Set: ipcS[62],
          Out: ipcS[63],
          Nov: ipcS[64],
          Dez: ipcS[65],
        },
        2021: {
          Jan: ipcS[66],
          Fev: ipcS[67],
          Mar: ipcS[68],
          Abr: ipcS[69],
          Mai: ipcS[70],
          Jun: ipcS[71],
          Jul: ipcS[72],
          Ago: ipcS[73],
          Set: ipcS[74],
          Out: ipcS[75],
          Nov: ipcS[76],
          Dez: ipcS[77],
        },
        2022: {
          Jan: ipcS[78],
          Fev: ipcS[79],
          Mar: ipcS[80],
          Abr: ipcS[81],
          Mai: ipcS[82],
          Jun: ipcS[83],
          Jul: ipcS[84],
          Ago: ipcS[85],
          Set: ipcS[86],
          Out: ipcS[87],
          Nov: ipcS[88],
          Dez: ipcS[89],
        }
      }
    }

    const productIPC = {
      'Alimentos e Bebidas não Alcoólicas': ipcFilter(data[2]),
      'Bebidas Alcoólicas, Tabaco e Narcóticos': ipcFilter(data[5]),
      'Vestuários e Calçados': ipcFilter(data[8]),
      'Habitação, Água, Electricidade, Gás e Outros Combustíveis': ipcFilter(data[11]),
      'Mobiliário, Artigos de Decoração, Equipamento Doméstico e Manutenção da Habitação': ipcFilter(data[16]),
      'Saúde': ipcFilter(data[23]),
      'Transportes': ipcFilter(data[26]),
      'Comunicações': ipcFilter(data[30]),
      'Lazer, Recreação e Cultura': ipcFilter(data[33]),
      'Educação': ipcFilter(data[37]),
      'Restaurantes, Hotéis, Cafés e Similares': ipcFilter(data[41]),
      'Bens e Serviços Diversos': ipcFilter(data[43]),
    }
    
    try {
      const parsedFile = JSON.parse(await fs.readFile(dest, 'utf8'))
      parsedFile.product = productIPC
        
      await fs.writeFile(dest, JSON.stringify(parsedFile))

      await fs.unlink(filePath)

      response.status(200).json(parsedFile);
      
    } catch (err) {
      response.status(500).json(err)
    }
  }
}
