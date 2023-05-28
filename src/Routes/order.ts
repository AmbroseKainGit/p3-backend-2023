import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import { check } from 'express-validator/src/middlewares/validation-chain-builders.js';
import { validateFields } from '../Utils/fieldValidator.js';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../Controllers/order.controller.js';

const orderRouter = Router();

orderRouter.get('/', errorChecked(getAllOrders));
orderRouter.post('/',
    [
        check('status', 'The status is mandatory').not().isEmpty(),
        check('waiterId', 'The waiter is mandatory').not().isEmpty(),
        check('tableId', 'The table is mandatory').not().isEmpty(),
        validateFields
    ],
    errorChecked(createOrder));
orderRouter.get('/:id', errorChecked(getOrderById));
orderRouter.put('/:id',
    [
        check('status', 'The status is mandatory').not().isEmpty(),
        validateFields
    ],
    errorChecked(updateOrder));
orderRouter.delete('/:id', errorChecked(deleteOrder));

export { orderRouter };