import {Request, Response} from 'express'
import Products from '../models/Product.model';

export const getProducts = async (req:Request, res:Response)=>{
    try {
        const products = await Products.findAll({
            order: [
                ['price', 'ASC']
            ]
        });
        res.status(200).json({data:products})
    } catch (error) {
        res.status(500).json({errors:{msg:'Error al conectar'}});
    }
}

export const getProductById =async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        
        const product = await Products.findByPk(id);
        if(!product){
            return res.status(404).json({errors: {msg:'no encontrado'}});
        }
        res.status(200).json({data: product});
    } catch (error) {
        res.status(500).json({errors:{msg:'Error al encontrar'}});
    }
}

export const createProducts =  async (req :Request, res: Response)=>{

    try {
        const product = new Products(req.body);
        const savedProduct = await product.save();
        res.status(201).json({data: savedProduct});
    } catch (error) {
        res.status(500).json({errors:{msg:'Error al conectar'}})
    }
    
}

export const updateProduct = async (req :Request, res: Response)=>{

    try {

        const product = await Products.findByPk(req.params.id);

        if(!product){
            return res.status(404).json({errors: {msg:'no encontrado'}});
        }

        const productUpdate = await product.update(req.body);
        // const productUpdate = await product.save();
        res.send(productUpdate);      

    } catch (error) {
        res.status(500).json({errors:{msg:'No fue encontrado'}});
    }
}

export const updateAvailability =  async (req :Request, res: Response)=>{

    try {

        const product = await Products.findByPk(req.params.id);

        if(!product){
            return res.status(404).json({errors: {msg:'no encontrado'}});
        }

        product.availability = !product.dataValues.availability;
        const productUpdate = await product.save();   
        res.json(productUpdate);

    } catch (error) {
        res.status(500).json({errors:{msg:'No fue encontrado'}});
    }
}

export const deleteProduct = async (req, res)=>{

    try {
        
        const product = await Products.findByPk(req.params.id);

        if(!product){
            return res.status(404).json({errors:{msg:'no fue encontrado'}});
        }
        product.destroy();
        res.json({data:'Producto eliminado'});

    } catch (error) {
        res.status(500).json({errors:{msg:'No fue encontrado'}});
    }
}
