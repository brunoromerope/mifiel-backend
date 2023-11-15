import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Document } from '@mifiel/api-client';
import * as xml2js from 'xml2js';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ApiService {

    async getDocuments(request: Request, response: Response): Promise<any>{
        console.log('Callback ...');
        console.log(request.body);
        
        const documentsDir = path.join(__dirname, '../..', 'documents/'+request.body.external_id);
        const filePath = path.join(documentsDir, request.body.file_file_name);
        const fileSignedPath = path.join(documentsDir, request.body.id + '.pdf');
        const xmlPath = path.join(documentsDir, request.body.id + '.xml');

        await this.getSignedDocument(request.body.id, 'file', fileSignedPath);
        await this.getSignedDocument(request.body.id, 'xml', xmlPath);

        const base64 = await this.convertFileToBase64(filePath);

        await this.addBase64ToXML(xmlPath, base64);

        response.status(200).send('API OK');
    }

    async getSignedDocument (document_id: string, tipo: string, path: string) {
        try{
    
            const result = await Document.saveFile({
                documentId: document_id,
                type: tipo === 'file' ? 'file_signed' : 'xml',
                path: path
            })
    
            console.log('Save', result);
        } catch (error) {
            console.log(error)
        }
        
    }

    async addBase64ToXML (filePath: string, base64: string) {
        try {
            // Read the XML file
            const data = await fs.readFileSync(filePath, { encoding: 'utf8'});
            
            // Parse the XML data
            const result = await xml2js.parseStringPromise(data);

            

            // Add base64 pdf into file tag
            if(result.electronicDocument.file){
                result.electronicDocument.file[0]['_'] = base64;

                const builder = new xml2js.Builder();
                const modifiedXml = builder.buildObject(result);

                // Overwrite the original XML file with the Base64 content
                await fs.writeFileSync(filePath, modifiedXml);
                console.log('Base64 content added');
            }

        } catch (error) {
            console.log(error);
        }
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

    async downloadFile (filename: string, external_id: string, response: Response): Promise<any> {
        const documentsDir = path.join(__dirname, '../..', 'documents/'+external_id);
        var filePath = path.join(documentsDir, filename);
        //response.setHeader('Content-Disposition', `inline; filename="${filename}"; filename*=UTF-8''${filename}`);
        if(!fs.existsSync(filePath)){
            response.status(404).json({statusCode: 404, message: 'File not found'});
        } else {
            response.sendFile(filePath);
        }
    }

}
