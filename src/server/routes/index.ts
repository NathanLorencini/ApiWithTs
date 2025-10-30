import { Router } from "express";
import { CityController } from "../../controllers/citys";
const router = Router();

router.get('/', (_, res) => {
    res.send('Home Page');
});

router.get('/citys',CityController.GetAllValidation,CityController.GetAll);
router.get('/citys/:id',CityController.GetByIdValidation,CityController.GetAll);
router.put('/citys/:id',CityController.UpdateByIdValidation,CityController.UpdateById);
router.post('/citys',CityController.createValidation,CityController.Create);
router.delete('/citys/:id',CityController.DeleteByIdValidation, CityController.DeleteById);

export { router }