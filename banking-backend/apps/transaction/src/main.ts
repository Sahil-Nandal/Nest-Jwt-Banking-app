import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransactionModule } from './transaction.module';

async function bootstrap() {
  // HTTP Server for public-facing endpoints
    const app = await NestFactory.create(TransactionModule);
    await app.listen(8082); 
  
    // gRPC microservice for internal communication
    const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(TransactionModule, {
      transport: Transport.GRPC,
      options: {
        package: 'transaction', 
        protoPath: './proto/transaction.proto', 
      },
    });
  
    await grpcApp.listen();
}
bootstrap();
