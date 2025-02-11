import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';



async function bootstrap() {

  // HTTP Server for public-facing endpoints
  const app = await NestFactory.create(AuthModule);
  const cors = require('cors');
  app.use(cors());

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3006', // Allow requests from React frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies & authorization headers
  });

  await app.listen(8080); 

  

  // app.enableCors();
  // gRPC microservice for internal communication
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth', 
      protoPath: './proto/auth.proto', 
    },
  });

  await grpcApp.listen();
}
bootstrap();
