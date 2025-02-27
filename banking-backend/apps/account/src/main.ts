import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';

async function bootstrap() {
  // HTTP Server for public-facing endpoints
    const app = await NestFactory.create(AccountModule);
    const cors = require('cors');
  app.use(cors());

  app.enableCors({
    origin: 'http://localhost:3006', // Allow requests from React frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies & authorization headers
  });
  
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
