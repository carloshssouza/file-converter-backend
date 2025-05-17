import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import * as os from 'os';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cluster from 'node:cluster';

async function bootstrap() {
  console.log('Starting worker...', cluster);
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);
    console.log(`Forking for ${numCPUs} CPUs`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    try {
      const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        WorkerModule,
        {
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'convert-file-queue',
            noAck: false,
            prefetchCount: 1,
          },
        },
      );
      await app.listen();
      console.log(
        `Worker ${process.pid} started and listening to RabbitMQ queue`,
      );
    } catch (error) {
      console.error(`Worker ${process.pid} failed to start:`, error);
      process.exit(1);
    }
  }
}

bootstrap();
