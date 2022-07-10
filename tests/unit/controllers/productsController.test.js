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

  describe('When create a new product', () => {
    describe('In case that succeed in create a new product', () => {
      const serviceResponse = {
        "id": 1,
        "name": 'product A'
      };

      before(() => {
        sinon.stub(ProductService, 'create').resolves(serviceResponse);
      });

      after(() => {
        ProductService.create.restore();
      });

      it('Should return 201 as status code', async () => {
        request.body = { "name": "product A" }
        await ProductController.create(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it('Should return a body with "id", "name" attributes', async () => {
        const body = { "id": 1, "name": "product A" };
        expect(response.json.calledWith(body)).to.be.true;
      });
    });

    describe('When it fails to create a new product because the product already exists', () => {
      const serviceResponse = {
           error: {
            code: 'alreadyExists',
            message: 'Product already exists',
          },
        }
      
      before(() => {
        sinon.stub(ProductService, 'create').resolves(serviceResponse);
      });

      after(() => {
        ProductService.create.restore();
      })

      it('Should return an object with error', async () => {
        request.params = '99';
        await ProductController.create(request, response, next);
        expect(next.calledWith({
          code: 'alreadyExists',
          message: 'Product already exists',
        },
        )).to.be.true;
      });
    });
  });

  describe('When update a product', () => {
    describe('When succeed', () => {
      const serviceReponse = {
        "id": 1,
        "name": "Product A"
      };

      before(() => {
        sinon.stub(ProductService, 'update').resolves(serviceReponse);
      });

      after(() => {
        ProductService.update.restore();
      });

      it('Should return 200 as status code', async () => {
        request.params = '1';
        request.body = { "name": "product A" }
        await ProductController.update(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Should return a body with "id", "name" attributes', async () => {
        const body = { "id": 1, "name": "product A" };
        expect(response.json.calledWith(body)).to.be.true;
      });
    });

    describe('When it fails', () => {
      const serviceResponse = {
        error: {
          code: 'notFound',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductService, 'update').resolves(serviceResponse);
      });

      after(() => {
        ProductService.update.restore();
      });

      it('Should return an object with error', async () => {
        request.params = '1';
        request.body = { "name": "product A" }
        await ProductController.update(request, response, next);
        expect(next.calledWith({
          code: 'notFound',
          message: 'Product not found',
        },
        )).to.be.true;
      });
    });
  });

  describe('When delete a product', () => {
    describe('When succeed', () => {
      
      before(() => {
        sinon.stub(ProductService, 'deleteProduct').resolves(true);
      });

      after(() => {
        ProductService.deleteProduct.restore();
      });


      it('Should return status 204, and end the request', async () => {
        request.params = '1'
        await ProductController.deleteProduct(request, response);
        expect(response.status.calledWith(204)).to.be.true;
      });
    });

    describe('When fails', () => { 

      const serviceResponse = {
        error: {
          code: 'notFound',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductService, 'deleteProduct').resolves(serviceResponse);
      });

      after(() => {
        ProductService.deleteProduct.restore();
      });

      it('Should return an object with error', async () => {
        request.params = '1';
        await ProductController.deleteProduct(request, response, next);
        expect(next.calledWith({
          code: 'notFound',
          message: 'Product not found',
        },
        )).to.be.true;
      });
     });
  });

  describe('When search a product by search term', () => {
    describe('When succeed', () => {
      const serviceReponse = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ];  
      before(() => {
        sinon.stub(ProductService, 'search').resolves([serviceReponse]);
      });

      after(() => {
        ProductService.search.restore();
      });

      it('Should return a 200 status codes', async () => {
        request.query = 'Martelo';

        await ProductController.search(request, response);

        expect(response.status.calledWith(200)).to.be.true
      });
    });
  });
});