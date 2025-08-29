/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface Icity {
    name: string;
    state: string;
    country: string;
}

interface IFilter {
    filter: string;
}

const bodyValidation: yup.ObjectSchema<Icity> = yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required(),
    country: yup.string().required(),
});

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
    filter: yup.string().required().min(3),

});


export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(err => {
            if (err.path)
                errors[err.path] = err.message;
        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errors
        })
    }
};

export const creatQueryValidator: RequestHandler = async (req, res, next) => {
    try {
        await queryValidation.validate(req.query, { abortEarly: false });
        return next();
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(err => {
            if (err.path)
                errors[err.path] = err.message;
        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errors
        })
    }
}

export const Create = async (req: Request<{}, {}, Icity>, res: Response) => {
    console.log(req.body);
    return res.send('City created');
}