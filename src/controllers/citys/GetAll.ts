/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IQyeryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const GetAllValidation = validation((getSchema) => ({
    query: getSchema<IQyeryProps>(yup.object().shape({
        page: yup.number().notRequired().moreThan(0),
        limit: yup.number().notRequired().moreThan(0),
        filter: yup.string().notRequired(),
    }))
}));

export const GetAll = async (req: Request<{},{},{},IQyeryProps>, res: Response) => {
    console.log(req.query);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('nao implementado');
}