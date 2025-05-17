import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class WorkerService {
  async convertFile(data: {
    filename: string;
    path: string;
    outputFormat: 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif';
  }) {
    const { filename, path: inputPath, outputFormat } = data;

    const outputDir = path.join(process.cwd(), 'tmp', 'outputs');
    const outputFilename = `${path.parse(filename).name}.${outputFormat}`;
    const outputPath = path.join(outputDir, outputFilename);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      console.log('Convertendo arquivo...', inputPath, outputPath);
      //coloque o arquivo final na output dentro de tmp/outputs
      const readStream = fs.createReadStream(inputPath);
      const writeStream = fs.createWriteStream(outputPath);

      readStream
        .pipe(sharp().toFormat(outputFormat))
        .pipe(writeStream)
        .on('finish', () => {
          console.log(
            `[Worker ${process.pid}] ${filename} convertido para ${outputFormat}.`,
          );
          resolve(true);
        })
        .on('error', (err) => {
          console.error('[Erro] na conversão via stream:', err);
          reject(err);
        });
    });
  }
}
