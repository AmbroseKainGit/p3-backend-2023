import { Router } from 'express';
import { errorChecked } from '../Utils/handler.js';
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
  } from '../Controllers/product.controller.js';
const productRouter = Router();

productRouter.get('/', errorChecked(getAllProducts));
productRouter.post('/', errorChecked(createProduct));
productRouter.get('/:id', errorChecked(getProductById));
productRouter.put('/:id', errorChecked(updateProduct));
productRouter.delete('/:id', errorChecked(deleteProduct));
export { productRouter };
