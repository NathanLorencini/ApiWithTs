import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello, World!');
});

router.get('/teste', (_, res) => {
    res.send("Rota Teste")
});

router.post('/teste', (req, res) => {
    console.log(req.body)
    return res.status(StatusCodes.ACCEPTED).json(req.body)
})


export { router }