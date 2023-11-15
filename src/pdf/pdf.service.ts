import { Injectable } from '@nestjs/common';
import { Document } from '@mifiel/api-client';
import { createHash } from 'crypto';
import * as PDFKit from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {

    async crearPDF(external_id: string): Promise<any> {
        return new Promise ((resolve, reject) => {

            const doc = new PDFKit();
            const buffers: Buffer[] = [];
            const hash = createHash('sha256');
                
            // Format current date and time for pdf name
            const now = new Date();
            const date = now.toLocaleDateString('es-MX').replace(/\//g, '-');
            const time = now.getHours().toString().padStart(2,'0') + '_' + now.getMinutes().toString().padStart(2, '0');
            const fileName = `${date}-${time}.pdf`;
    
            // Ensure the 'documents' directory exists otherwise create it.
            const documentsDir = path.join(__dirname, '../..', 'documents/'+external_id);
            if(!fs.existsSync(documentsDir)){
                fs.mkdirSync(documentsDir, { recursive: true});
            }
    
            // Define the file path
            const filePath = path.join(documentsDir, fileName);
    
            // Create a write stream to the file system
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            
            doc.on('data', (chunk)  =>{
                buffers.push.bind(buffers);
                hash.update(chunk);
            });
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                const fileHash = hash.digest('hex');
                console.log('Crypto',fileHash);
                fs.writeFileSync(filePath, pdfData);
                resolve({filePath, fileName, fileHash});
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

    async convertFileToBase64 (filePath: string): Promise<string>{
        try {
            const data = await fs.readFileSync(filePath);
            const base64String = data.toString('base64');
            
            return base64String;
        } catch (error) {
            console.log('Error reading the file: ', error)
        }
    }

    async createDocument(filePath: string, fileName: string, fileHash: string, external_id: string): Promise<any> {
        const hexHash = await this.getHash(filePath);
        console.log('Mifiel', hexHash);
        const newDocument = await Document.create({
            original_hash: fileHash,
            name: fileName,
            //file: filePath,
            signatories: [{
                name: 'Bruno Romero',
                email: 'bruno.romero.pe17@gmail.com',
                tax_id: 'BBBB020202BBB'
            }],
            callback_url: "http://192.141.125.8:6868/api",
            sign_callback_url: "http://192.141.125.8:6868/sign",
            external_id: external_id
        })
        //console.log(newDocument);
        return newDocument;
    }
}
