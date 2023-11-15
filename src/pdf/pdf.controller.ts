import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async crearPDF(@Res() res: Response) {
    const external_id = ''+new Date().getTime();
    const {filePath, fileName, fileHash } = await this.pdfService.crearPDF(external_id);
    
    const resp = await this.pdfService.createDocument(filePath, fileName, fileHash, external_id);
    const base64 = await this.pdfService.convertFileToBase64(filePath);
    const widget_id = resp.signers[0].widget_id;

    res.status(200).json({base64, widget_id})
  }
}
