import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async crearPDF(@Res() res: Response) {
    const {filePath, fileName } = await this.pdfService.crearPDF();

    await this.pdfService.createDocument(filePath, fileName);

    res.sendFile(filePath, (err) => {
      if (err){
        throw err;
      }
    })
  }
}
