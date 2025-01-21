import { Request, Response, NextFunction } from 'express';
declare class JsonPlaceholderPostController {
    static getList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static updateById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static partialUpdateById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static deleteById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export { JsonPlaceholderPostController };
