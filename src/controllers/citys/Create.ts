/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";

interface Icity {
    name: string;
    state: string;
    country: string;
}

interface IFilter {
    filter?: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<Icity>(yup.object().shape({
        name: yup.string().required().min(3),
        state: yup.string().required().min(2),
        country: yup.string().required(),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().required().min(3),
    }))
}));

export const Create = async (req: Request<{}, {}, Icity>, res: Response) => {
    console.log(req.body);
    return res.send('City created');
}