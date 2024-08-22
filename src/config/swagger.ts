import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const option : swaggerJSDoc.Options = {
    definition:{
        openapi:'3.0.2',
        tags:[{
            name:'Products',
            description: 'API Operation related to products'
        }],
        info:{
            title:'Rest API node.js/ Express /Typescript ',
            version:'1.0.0',
            description:'Api docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(option);

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper  
    `
}

export default swaggerSpec 
