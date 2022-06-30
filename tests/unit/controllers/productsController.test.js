const { expect } = require('chai');
const sinon = require('sinon');

const ProductController = require('../../../controllers/productsController');
const ProductService = require('../../../services/productsService');

describe('TEST PRODUCT CONTROLLER', () => {
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    response.end = sinon.stub().returns();
    next = sinon.stub();
  });

  describe('When get all products', () => {

    before(() => {
       const serviceResponse =  [
          {
            "id": 1,
            "name": "product A",
          },
          {
            "id": 2,
            "name": "product B",
          }
       ];
      
      sinon.stub(ProductService, 'getAll').resolves(serviceResponse);
    });

    after(() => {
      ProductService.getAll.restore();
    })
  
    describe('When it succeed', () => {
      it('Should return 200  as status code', async () => {
        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Should return a json with objects', async () => {
        await ProductController.getAll(request, response);
          const json = [
          {
            "id": 1,
            "name": "product A",
          },
          {
            "id": 2,
            "name": "product B",
          }
       ];

        expect(response.json.calledWith(json)).to.be.equal(true);
      });
    });
  });

  describe('When get a product by id', () => {

    describe('In case that find the product by id', () => {
      const serviceResponse = {
        "id": 1,
        "name": "product A",
      };

      before(() => {
        sinon.stub(ProductService, 'findById').resolves(serviceResponse);
      });
  
      after(() => {
        ProductService.findById.restore();
      });

      it('Should return 200 as status code', async () => {
        request.params = '1';
        await ProductController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Should return a json object with data of product', async () => {
        request.params = '1';
        await ProductController.findById(request, response);
        const json = {
        "id": 1,
        "name": "product A",
        }
        expect(response.json.calledWith(json)).to.be.equal(true);
      });

    });

    describe('In case that not find the product by id', () => {
      before(() => {
        const serviceResponse = {
          error: {
            code: 'notFound',
            message: 'Product not found'
          }
        }
        sinon.stub(ProductService, 'findById').resolves(serviceResponse);
      });

      after(() => {
        ProductService.findById.restore();
      })

      it('Should return an object with error', async () => {
        request.params = '99';
        await ProductController.findById(request, response, next);
        expect(next.calledWith({
          code: 'notFound',
          message: 'Product not found',
          },
        )).to.be.true;
      })
      
    });
    
  });
});