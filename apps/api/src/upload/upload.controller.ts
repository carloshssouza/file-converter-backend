import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import type { Multer } from 'multer';
import { OutputFormat } from './dto/convert-request.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp/uploads',
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}-${file.originalname}`),
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Multer.File,
    @Query('outputFormat') outputFormat: OutputFormat,
  ) {
    const extension = file.originalname.split('.').pop();

    if (!Object.values(OutputFormat).includes(extension as OutputFormat)) {
      throw new BadRequestException(
        `Formato de arquivo não suportado. Formatos suportados: ${Object.values(
          OutputFormat,
        ).join(', ')}`,
      );
    }

    if (extension !== outputFormat) {
      this.uploadService.sendToQueue({
        filename: file.filename,
        path: file.path,
        outputFormat,
      });

      return {
        message: 'Upload file successfully',
        filename: file.filename,
        outputFormat,
      };
    } else {
      throw new BadRequestException(
        `Formatos iguais entre o arquivo e o formato de saída: ${extension} e ${outputFormat}`,
      );
    }
  }
}
