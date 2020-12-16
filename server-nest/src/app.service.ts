import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Nest server seems to be running...';
    }

    getFiles(path: string): string[] {
        return fs.readdirSync(path);
    }
}
