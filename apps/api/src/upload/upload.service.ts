import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileData } from './dto/filedata.dto';

@Injectable()
export class UploadService {
  constructor(@Inject('UPLOAD_SERVICE') private readonly client: ClientProxy) {}

  sendToQueue(fileData: FileData) {
    this.client.emit('upload-file', fileData);
  }
}
