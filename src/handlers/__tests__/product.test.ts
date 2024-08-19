import request from 'supertest'
import server from '../../server'

describe('Create POST /api/products', ()=>{

    it('create product', async ()=>{
        const response = await request(server).post("/api/products").send({
            name:"Mouse -testing",
            price:200
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });

    it('create product errors', async ()=>{
        const response = await request(server).post("/api/products").send({
            name:"",
            price:0
        });

        expect(response.status).toBe(400);
        expect(response.status).not.toBe(201);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
    });
   
});
describe('get',()=>{

    it('should check if /api/products url exists', async ()=>{
        const response =  await request(server).get('/api/products')
        expect(response.status).toBe(200);
        expect(response.status).not.toBe(404);

    });
    it('verify get all products /api/products', async()=>{
        const response = await request(server).get("/api/products");
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeDefined();

        expect(response.body).not.toHaveProperty('errors');
    });
});
describe('get product by Id', ()=>{
    
    it('product exists', async()=>{
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).not.toHaveProperty('errors');
    });
    it('product not exists', async()=>{
        const response = await request(server).get('/api/products/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');
    });
    it('should validate url id not is a text', async()=>{
        const response = await request(server).get('/api/products/hola');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });
});

describe('PUT /api/product/:id', () => {

    it('should verify PARAMS url', async()=>{
        const response = await request(server).put('/api/products/-5').send({
            name:"monitor curvo",
            price: 300,
            availability:true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })

    it('should display validation error messages when updating a product', async()=>{
        const response = await request(server).put('/api/products/999').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('should display validation error messages when updating a product', async()=>{
        const response = await request(server).put('/api/products/1').send({
            name:"monitor curvo",
            price: -300,
            availability:true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
    it('should display validation error messages when updating a product', async()=>{
        const response = await request(server).put('/api/products/999').send({
            name:"monitor curvo",
            price: 300,
            availability:true
        });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
});

describe('DELETE /api/products', ()=>{
    it('should verify  URL not valid ', async()=>{
        const response = await request(server).delete('/api/products/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(200);
    });
    it('should verify  URL valid ', async()=>{
        const response = await request(server).delete('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
    });
})