import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { Config } from '@mifiel/api-client-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);

  app.enableCors();

  Config.setTokens({
    appId: appService.getAPP_ID(),
    appSecret: appService.getAPP_SECRET(),
    env: 'sandbox',
  })

  await app.listen(3001);
}
bootstrap();
