import * as Joi from "joi";
import {AnySchema, ValidationErrorItem} from "joi";
import {NextFunction, Request, Response} from "express";

export const userSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]*/),
    age: Joi.number().integer().min(4).max(130),
    isDeleted: Joi.boolean().required(),
});

function errorResponse(schemaErrors: ValidationErrorItem[]) {
    const errors = schemaErrors.map((error: ValidationErrorItem) => {
        let {path, message} = error;
        return {path, message};
    });
    return {
        status: 'failed',
        errors,
    };
}

export function validateSchema(schema: AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        }) ;

        if (error) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}
