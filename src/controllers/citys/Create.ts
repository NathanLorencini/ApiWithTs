/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Request, Response } from "express";
// import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface Icity {
    name: string;
    state: string;
    country: string;
}

const bodyValidation: yup.ObjectSchema<Icity> = yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required(),
    country: yup.string().required(),
});


export const Create = async (req: Request<{}, {}, Icity>, res: Response) => {
    let validateBody: Icity | undefined = undefined;
    try {
        validateBody = await bodyValidation.validate(req.body)
    } catch (error) {
        const yupError = error as yup.ValidationError;
        return res.json({
            errors: {
                default: yupError.message
            }
        })
    }
}