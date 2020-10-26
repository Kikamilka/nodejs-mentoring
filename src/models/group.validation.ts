import * as Joi from "joi";

export const groupSchema = Joi.object().keys({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.array().required(),
});
