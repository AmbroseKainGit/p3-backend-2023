import { Router } from 'express';
import { errorChecked } from '../Utils/handler';
import {
    getAllCategories,
    getCategoryById
} from '../Controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', errorChecked(getAllCategories));
categoryRouter.get('/:id', errorChecked(getCategoryById));
export { categoryRouter };
