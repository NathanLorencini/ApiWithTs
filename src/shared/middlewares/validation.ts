import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError, type Maybe, type AnyObject } from 'yup';


type TProperty = 'body' | 'header' | 'params' | 'query';
type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;
type TALLSchemas = Record<TProperty, ObjectSchema<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TALLSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;


export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
            // return next();
        } catch (error) {
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(err => {
                if (err.path)
                    errors[err.path] = err.message;
            });

            errorsResult[key] = errors;


            // return res.status(StatusCodes.BAD_REQUEST).json({
            //     errors: errors
            // })
        }
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();

    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsResult
        });
    }



};