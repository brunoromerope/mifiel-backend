import { Injectable } from '@nestjs/common';
import { Document } from '@mifiel/api-client';
import { Response } from 'express';
import * as PDFKit from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentService {
  
  // Fetch all Mifiel documents
  async findAll(): Promise<any>{
    const documents = await Document.all();
    const docs = documents.map((document) => ({
      id: document.id,
      name: document.file_file_name,
      state: document.state,
      created_at: document.created_at
    }))
    return docs;
  }

  // Fetch a Mifiel document by id and add files path
  async findOne(id: string): Promise<any> {
    const document = await Document.find(id);
    const filePath = await this.readFile(document.file_file_name, document.external_id);
    const base64 = await this.convertToBase64(filePath);
    document['base64'] = base64;
    document['signed_filename'] = document.id + '.pdf';
    document['xml_filename'] = document.id + '.xml';
    return document;
  }

  async readFile (fileName: string, external_id: string): Promise<any> {
    const documentsDir = path.join(__dirname, '../..', 'documents/'+external_id);

    const filePath = path.join(documentsDir, fileName);

    return filePath;
  }

  async convertToBase64 (filePath: string): Promise<any> {
    try {
      var base64String = null;
      if(fs.existsSync(filePath)){
        const data = await fs.readFileSync(filePath);
        base64String = data.toString('base64');
      }
      return base64String;
    } catch (error) {
        console.log('Error reading the file: ', error)
    }
  }

}
