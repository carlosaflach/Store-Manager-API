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
            "name": "produto A",
            "quantity": 10
          },
          {
            "id": 2,
            "name": "produto B",
            "quantity": 20
          }
        ];
  
        sinon.stub(ProductModel, 'getAll').resolves(response);
  
      });
  
      after(() => {
        ProductModel.getAll.restore();
      });

      it('Should return an object with code and data attributes as response', async () => {
        const products = await ProductService.getAll();
        expect(products).to.be.an('object');
        expect(products).to.have.all.keys('code', 'data');
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
  
      it('Deve retornar false', async () => {
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

      const obj = {
        code: 200,
        data: response
      }

      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(obj);
      })

      after(() => {
        ProductModel.findById.restore();
      });

      it('Should return an object with keys "code" and "data".', async () => {
        const serviceResponse = await ProductService.findById(id);
  
        expect(serviceResponse).to.be.a('object');
        expect(serviceResponse).to.have.all.keys('code', 'data');
      });
    });

    describe('In case that dont find the product', () => {
      const notExistsId = 47
      const response = null;

      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(response);
      });

      after(() => {
        ProductModel.findById.restore();
      });


      // TODO: Arrumar retorno do service com o erro padrão do middleware de erro.
      it('Should return false', async () => {
        const serviceResponse = await ProductService.findById(notExistsId);
        expect(serviceResponse).to.be.false;
      });
    });
  });
});