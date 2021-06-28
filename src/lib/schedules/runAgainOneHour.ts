import fs from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';
import { resolve } from 'path';

const counterPath = resolve(__dirname, '..', '..', '..', 'files', 'counter.txt');

const runAgainOneHour = (dl: DownloaderHelper) => {
  fs.readFile(counterPath, 'utf8', (err, file) => {
    if(err) return console.log(err);

    const count = Number(file);

    if(count >= 6) {
      fs.writeFile(counterPath, `0`, (err) => {
        if(err) return console.log(err);
      })

      return
    }

    fs.writeFile(counterPath, `${count+1}`, (err) => {
      if(err) return console.log(err);
      
      setTimeout(() => {
        dl.start()
      }, 3600000)

    })
  })
}

export default runAgainOneHour;