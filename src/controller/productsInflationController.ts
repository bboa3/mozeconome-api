import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';
import xlsx from 'xlsx';
import isRawNumber from '../validations/rawNumber';

type ProductData = {
  year: number
  homologa: number[]
}

interface ProductInflation {
  name: string
  data: ProductData[]
}
export default {
  async create(request: Request, response: Response) {
    const { dataArrayIndex, productArrayIndex, year17, year18, year19, year20, year21 } = request.body;
    const inflationFile = request.file;

    if(!inflationFile) {
      return response.status(400).json({error: 'You must provide inflation file'});
    }

    // await isRawNumber.rawNumber({mensalRawNumber, homologaRawNumber});

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
    })[Number(dataArrayIndex)]                                                          


    // 2017
    const count2017 = data.filter((d: number) => d === year17).length;    
    
    if(count2017 > 1) 
    return response.status(400).json({error: `You have more than one of that index. ${year17}`});
    
    const startIndex2017 = data.indexOf(Number(year17));                       

    const i2017 = data.splice(startIndex2017, 12);

    // 2018
    const count2018 = data.filter((d: number) => d === year18).length;      
    
    if(count2018 > 1) 
    return response.status(400).json({error: `You have more than one of that index. ${year18}`});
    
    const startIndex2018 = data.indexOf(Number(year18));                         

    const i2018 = data.splice(startIndex2018, 12);

    // 2019
    const count2019 = data.filter((d: number) => d === year19).length;    
    
    if(count2019 > 1) 
    return response.status(400).json({error: `You have more than one of that index. ${year19}`});
    
    const startIndex2019 = data.indexOf(Number(year19));                  

    const i2019 = data.splice(startIndex2019, 12);

    // 2020
    const count2020 = data.filter((d: number) => d === year20).length;  
    
    if(count2020 > 1) 
    return response.status(400).json({error: `You have more than one of that index. ${year20}`});
    
    const startIndex2020 = data.indexOf(Number(year20));                       

    const i2020 = data.splice(startIndex2020, 12);

    // 2021
    const count2021 = data.filter((d: number) => d === year21).length;   
    
    if(count2021 > 1)                                                          
    return response.status(400).json({error: `You have more than one of that index. ${year21}`});
    
    const startIndex2021 = data.indexOf(Number(year21));                                

    const i2021 = data.splice(startIndex2021, 12);                              

    const productData = [
      {
        year: 2017,
        homologa: i2017
      },
      {
        year: 2018,
        homologa: i2018
      },
      {
        year: 2019,
        homologa: i2019
      },
      {
        year: 2020,
        homologa: i2020
      },
      {
        year: 2021,
        homologa: i2021
      }
    ]

    fs.readFile(dest, 'utf8', (err, file) => {
      if(err) return response.status(500).json(err);

      const parsedFile = JSON.parse(file);
      const products: ProductInflation[] = parsedFile.products;

      products[Number(productArrayIndex)].data = productData                                     

      const inflationData = {...parsedFile, products: products}      
      
      fs.writeFile(dest, JSON.stringify(inflationData), (err) => {
        if(err) return response.status(500).json(err);
      })

      fs.unlink(filePath, (err) => {
        if(err) return response.status(500).json(err);
      })

      response.status(200).json(productData);
    })
  }
}