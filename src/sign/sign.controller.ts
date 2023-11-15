import { Controller, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SignService } from './sign.service';
import { Request } from 'express';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post()
  async callback_url(@Req() request: Request){
    console.log('Signed Callback');
    return this.signService.getStatus(request);
  }
}
