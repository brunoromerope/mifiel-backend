import { Controller, Get, Post, Req, UseInterceptors, UploadedFiles, Res, Param, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // Webhook for completed documents
  @Post()
  callback_url(@Req() request: Request, @Res() response: Response) {
    return this.apiService.getDocuments(request, response);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('download/:external_id/:filename')
  getDocument(@Param('filename') filename: string, @Param('external_id') external_id: string, @Res() response: Response) {
    return this.apiService.downloadFile(filename, external_id, response);
  }
}
