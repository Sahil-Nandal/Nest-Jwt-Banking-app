import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';

async function bootstrap() {
  // HTTP Server for public-facing endpoints
    const app = await NestFactory.create(AccountModule);
    await app.listen(8081); 
  
    // gRPC microservice for internal communication
    const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AccountModule, {
      transport: Transport.GRPC,
      options: {
        package: 'account', 
        protoPath: './proto/account.proto', 
        url: 'localhost:5001'
      },
    });
  
    await grpcApp.listen();
}
bootstrap();
