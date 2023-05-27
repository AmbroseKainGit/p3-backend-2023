import { Router } from 'express';
import { errorChecked } from '../Utils/handler';
import { getAllCategories } from '../Controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', errorChecked(getAllCategories));
export { categoryRouter };
