import {Router} from 'express'
import { body, param } from 'express-validator';
import { createProducts, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', getProducts);

router.get('/:id', 
    param('id').isInt().withMessage('el id debe ser un numero'),
    handleInputErrors,
    getProductById);

router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto no puede ser vacio'),
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ser vacio')
    .custom( value => value>0).withMessage('El precio del producto no puede ser negativo'),
    handleInputErrors,
    createProducts);


router.put('/:id',
    param('id').isInt().withMessage('el id debe ser un numero').custom( value => value >= 0).withMessage('El ID no puede ser negativo'), 
    body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio'),
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ser vacio')
    .custom( value => value >= 0).withMessage('El precio no puede ser negativo'),
    body('availability').isBoolean().withMessage('Valor disponible incorrecto'),
    handleInputErrors,
    updateProduct);

router.patch('/:id',param('id').isInt().withMessage('el id debe ser un numero'),
    handleInputErrors,
    updateAvailability );

router.delete('/:id', 
    param('id').isInt().withMessage('el id debe ser un numero'),
    handleInputErrors,
    deleteProduct);

export default router;