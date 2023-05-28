import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import { check } from 'express-validator/src/middlewares/validation-chain-builders.js';
import { validateFields } from '../Utils/fieldValidator.js';
import {
    createTable,
    deleteTable,
    getAllTables,
    getTableById,
    updateTable
} from '../Controllers/table.controller.js';

const tableRouter = Router();

tableRouter.get('/', errorChecked(getAllTables));
tableRouter.post('/',
    [
        check('name', 'The name is mandatory').not().isEmpty(),
        check('capacity', 'The capacity is mandatory').not().isEmpty(),
        validateFields
    ],
    errorChecked(createTable));
tableRouter.get('/:id', errorChecked(getTableById));
tableRouter.put('/:id',
    [
        check('name', 'The name is mandatory').not().isEmpty(),
        check('capacity', 'The capacity is mandatory').not().isEmpty(),
        validateFields
    ],
    errorChecked(updateTable));
tableRouter.delete('/:id', errorChecked(deleteTable));

export { tableRouter };