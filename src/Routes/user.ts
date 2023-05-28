import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import { check } from 'express-validator/src/middlewares/validation-chain-builders.js';
import { validateFields } from '../Utils/fieldValidator.js';
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} from "../Controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', errorChecked(getAllUsers));
userRouter.post('/',
    [
        check('name', 'The name is mandatory').not().isEmpty(),
        check('email', 'The email is mandatory').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        validateFields
    ],
    errorChecked(createUser));
userRouter.get('/:id', errorChecked(getUserById));
userRouter.put('/:id', errorChecked(updateUser));
userRouter.delete('/:id', errorChecked(deleteUser));

export { userRouter };