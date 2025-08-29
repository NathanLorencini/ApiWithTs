import { Router } from "express";
import { CityController } from "../../controllers/citys";
const router = Router();

router.get('/', (_, res) => {
    res.send('Home Page');
});

router.post('/citys',
    CityController.createBodyValidator,
    CityController.creatQueryValidator,
    CityController.Create);

export { router }