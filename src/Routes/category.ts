import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import {
    createCategory,
    getAllCategories,
    getCategoryById
} from '../Controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.get('/', errorChecked(getAllCategories));
categoryRouter.post('/', errorChecked(createCategory));
categoryRouter.get('/:id', errorChecked(getCategoryById));
export { categoryRouter };
