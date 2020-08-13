import * as Joi from "joi";

export const userSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]*/),
    age: Joi.number().integer().min(4).max(130),
    isDeleted: Joi.boolean().required(),
});

function errorResponse(schemaErrors: any) {
    const errors = schemaErrors.map((error: any) => {
        let {path, message} = error;
        return {path, message};
    });
    return {
        status: 'failed',
        errors,
    };
}

export function validateSchema(schema: any) {
    return (req: any, res: any, next: any) => {
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
