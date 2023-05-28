import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import { validateFields } from '../Utils/fieldValidator.js';
import { check } from 'express-validator/src/middlewares/validation-chain-builders.js';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from '../Controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.get('/', errorChecked(getAllCategories));
categoryRouter.post('/',
    [
        check('name', 'The name is mandatory').not().isEmpty(),
        validateFields
    ],
    errorChecked(createCategory));
categoryRouter.get('/:id', errorChecked(getCategoryById));
categoryRouter.put('/:id',
    [
        check('name', 'The name is mandatory').not().isEmpty(),
        validateFields
    ],
    errorChecked(updateCategory));
categoryRouter.delete('/:id', errorChecked(deleteCategory));
export { categoryRouter };
