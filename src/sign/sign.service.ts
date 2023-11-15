import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SignService {

    async getStatus( request: Request): Promise<any>{
        console.log('Sign Callback ...');
        console.log(request);
        return 'ok';
    }
}
