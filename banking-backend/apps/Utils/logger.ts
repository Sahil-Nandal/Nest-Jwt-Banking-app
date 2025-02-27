// src/logger/winston.logger.ts
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file'; // Optional for rotating logs daily
 
export class WinstonLoggerService implements LoggerService {
  private readonly logger: winston.Logger;
 
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'info',
        }),
      ],
    });
  }
 
  log(message: string) {
    this.logger.info(message);
  }
 
  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }
 
  warn(message: string) {
    this.logger.warn(message);
  }
 
  debug(message: string) {
    this.logger.debug(message);
  }
 
  verbose(message: string) {
    this.logger.verbose(message);
  }
}