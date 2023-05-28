import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from '../Controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.get('/', errorChecked(getAllCategories));
categoryRouter.post('/', errorChecked(createCategory));
categoryRouter.get('/:id', errorChecked(getCategoryById));
categoryRouter.put('/:id', errorChecked(updateCategory));
categoryRouter.delete('/:id', errorChecked(deleteCategory));
export { categoryRouter };
