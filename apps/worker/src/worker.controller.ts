import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @EventPattern('upload-file')
  async convertFile(data: {
    filename: string;
    path: string;
    outputFormat: 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif';
  }) {
    console.log('Recebido evento de conversão:', data);
    return this.workerService.convertFile(data);
  }
}
