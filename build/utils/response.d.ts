import { Response } from 'express';
declare const responseWithMessage: (res: Response, code: number, message: string) => void;
declare const responseWithData: (res: Response, code: number, data: object) => void;
declare const responseWithMetadata: (res: Response, code: number, data: object, metadata: object) => void;
export { responseWithMessage, responseWithData, responseWithMetadata };
