import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { PdfModule } from './pdf/pdf.module';
import { SignModule } from './sign/sign.module';
import { DocumentModule } from './document/document.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({ // Import module to read .env file
    isGlobal: true,
  }),MongooseModule.forRootAsync({ // Import mongoose module to interact with database
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'), // Retrives database URI from .env
    }),
    inject: [ConfigService]
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'dist-front'), // Serve static files for front-end
  }), 
  ApiModule, PdfModule, SignModule, DocumentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,JwtService, JwtStrategy], // Use providers for authentication
})
export class AppModule {}
