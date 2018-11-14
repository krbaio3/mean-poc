import { Request } from 'express';

export interface MulterFile extends Request {
    // key: string // Available using `S3`.
    // path: string // Available using `DiskStorage`.
    // mimetype: string
    // originalname: string
    // size: number,
    files?: any
}
