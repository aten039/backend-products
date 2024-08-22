import {Router} from 'express'
import { body, param } from 'express-validator';
import { createProducts, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

/**
*@swagger 
*components:  
*   schemas:
*       Product:
*           type: object
*           properties: 
*               id:
*                   type: integer
*                   description: The Product Id
*                   example: 1
*               name:
*                   type: string
*                   description: The Product name
*                   example: televisor 
*               price:
*                   type: number
*                   description: The Product price
*                   example: 200 
*               availability:
*                   type: boolean
*                   description: The Product availability
*                   example: true 
*/  

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: get a list of products
 *          tags: 
 *              - Products 
 *          description: Return a list of products
 *          responses: 
 *              200: 
 *                  description: succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */



//routing
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/:id:
 *      get:
 *          summary: Get a product by id
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: a ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              500:
 *                  description: Bad Request invalid
 */

router.get('/:id', 
    param('id').isInt().withMessage('el id debe ser un numero'),
    handleInputErrors,
    getProductById);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new Product
 *          tags: 
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: 'monitor currvo'
 *                              price: 
 *                                  type: number
 *                                  example: 200
 *          responses:
 *              201:
 *                  description: create product succesful
 *                  content:
 *                       application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 * 
 *              500:
 *                  description: Error and server 
 *  
 * 
 * 
 */
router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto no puede ser vacio'),
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ser vacio')
    .custom( value => value>0).withMessage('El precio del producto no puede ser negativo'),
    handleInputErrors,
    createProducts);

/**
 * @swagger 
 * /api/products/:id:
 *  put:
 *      summary: update a product with user input
 *      tags:
 *          - Products
 *      description: Returns the update product
 *      parameters:
 *        - in: patch
 *          name: id
 *          description: The id of the product
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: 'monitor currvo'
 *                          price: 
 *                              type: number
 *                              example: 200
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product no found
 *          500: 
 *              description: Bad Request
 * 
 */


router.put('/:id',
    param('id').isInt().withMessage('el id debe ser un numero').custom( value => value >= 0).withMessage('El ID no puede ser negativo'), 
    body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio'),
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ser vacio')
    .custom( value => value >= 0).withMessage('El precio no puede ser negativo'),
    body('availability').isBoolean().withMessage('Valor disponible incorrecto'),
    handleInputErrors,
    updateProduct);


/**
 * @swagger
 * 
 * /api/products/:id:
 *  patch:
 *      summary: Update Product Availability
 *      tags:
 *          - Products
 *      description: Return the update availability
 *      parameters:
 *        - in: patch
 *          name: id
 *          description: The id of the product
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product no found
 *          500: 
 *              description: Bad Request
 */


router.patch('/:id',param('id').isInt().withMessage('el id debe ser un numero'),
    handleInputErrors,
    updateAvailability );

/**
 * @swagger
 * /api/products/:id:
 *  delete:
 *      summary: Delete product
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: patch
 *          name: id
 *          description: The id of the product
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          404:
 *              description: Product no found
 *          500: 
 *              description: Bad Request
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('el id debe ser un numero'),
    handleInputErrors,
    deleteProduct);

export default router;