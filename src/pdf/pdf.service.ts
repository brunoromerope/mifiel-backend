import { Injectable } from '@nestjs/common';
import { Document } from '@mifiel/api-client';
import * as PDFKit from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {

    async crearPDF(): Promise<any> {
        return new Promise ((resolve, reject) => {

            const doc = new PDFKit();
            const buffers: Buffer[] = [];
                
            // Format current date and time for pdf name
            const now = new Date();
            const date = now.toLocaleDateString('es-MX').replace(/\//g, '-');
            const time = now.getHours().toString().padStart(2,'0') + '_' + now.getMinutes().toString().padStart(2, '0');
            const fileName = `${date}-${time}.pdf`;
    
            // Ensure the 'documents' directory exists otherwise create it.
            const documentsDir = path.join(__dirname, '..', 'documents');
            if(!fs.existsSync(documentsDir)){
                fs.mkdirSync(documentsDir, { recursive: true});
            }
    
            // Define the file path
            const filePath = path.join(documentsDir, fileName);
    
            // Create a write stream to the file system
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                fs.writeFileSync(filePath, pdfData);
                resolve({filePath, fileName});
            });
            doc.on('error', err => {
                reject(err)
            });
    
            // PDF Generation
            doc.text(`Documento PDF ${fileName}`, 100, 50);
            doc.end();
        });
        
    }

    async getHash(filePath: string): Promise<string> {
        const fileBuffer = fs.readFileSync(filePath);
        const hexHash = await Document.getHash(fileBuffer);
        
        return hexHash;
    }

    async createDocument(filePath: string, fileName: string): Promise<any> {
        const hexHash = await this.getHash(filePath);
        const newDocument = await Document.create({
            //original_hash: hexHash,
            //name: fileName,
            file: filePath,
            signatories: [{
                name: 'Bruno Romero',
                email: 'bruno.romero.pe17@gmail.com',
                tax_id: 'BBBB020202BBB'
            }]
        })
        console.log(newDocument);
        return true;
    }
}
