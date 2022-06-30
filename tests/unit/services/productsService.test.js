const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../../services/productsService');
const ProductModel = require('../../../models/productsModel');

describe('TEST PRODUCT SERVICE', () => {
  describe('When get all products', () => {
    describe('When products exists', () => {

      before(() => {
        const response =  [
          {
            "id": 1,
            "name": "product A",
          },
          {
            "id": 2,
            "name": "product B",
          }
        ];
  
        sinon.stub(ProductModel, 'getAll').resolves(response);
  
      });
  
      after(() => {
        ProductModel.getAll.restore();
      });

      it('Should return an array of objects', async () => {
        const products = await ProductService.getAll();
        expect(products).to.be.an('array');
        
        products.forEach((p) => {
          expect(p).to.be.an('object');
          expect(p).to.have.all.keys('id', 'name');
        })
      });
    });

  describe('When case that dont exists products', () => {
      before(() => {
        const response = null;
        sinon.stub(ProductModel, 'getAll').resolves(response);
      });
  
      after(async () => {
        ProductModel.getAll.restore();
      });
  
      it('Shpuld return false', async () => {
        const products = await ProductService.getAll();
  
        expect(products).to.be.equal(false);
      });
    });
  });

  describe('When get a product by id', () => {
    describe('In case that find the product', () => {
      const id = '1';
      const response =   {
        "id": 1,
        "name": "product A",
      };


      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(response);
      })

      after(() => {
        ProductModel.findById.restore();
      });

      it('Should return product object with keys "id" and "name".', async () => {
        const serviceResponse = await ProductService.findById(id);
  
        expect(serviceResponse).to.be.a('object');
        expect(serviceResponse).to.have.all.keys('id', 'name');
      });
    });

    describe('In case that dont find the product', () => {
      const notExistsId = 47
      const response = {
        error: {
          code: 'notFound',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(response);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it('Should return an error object', async () => {
        const serviceResponse = await ProductService.findById(notExistsId);
        expect(serviceResponse).to.be.an('object');
        expect(serviceResponse).to.have.key('error');
      });
    });
  });
});