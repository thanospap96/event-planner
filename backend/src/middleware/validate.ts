import { ZodSchema} from "zod";
import {Request, Response, NextFunction} from "express";

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const toValidate = { body: req.body, query: req.query, params: req.params };
            schema.parse(toValidate);
            next();
        } catch (err: any) {
            return res.status(400).json({
                message: 'Validation error',
                errors: err?.errors ?? err?.message
            });
        }
    };