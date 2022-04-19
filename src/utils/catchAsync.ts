import { Request, Response, NextFunction } from 'express';
export function catchAsync(func: (arg0: any, arg1: any, arg2: any) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next)
    }
}