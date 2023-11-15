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
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'),
    }),
    inject: [ConfigService]
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'dist-front'),
  }), 
  ApiModule, PdfModule, SignModule, DocumentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,JwtService, JwtStrategy],
})
export class AppModule {}
