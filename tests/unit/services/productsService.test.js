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
  
      it('Should return false', async () => {
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
    
      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(undefined);
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

  describe('When creating a new product', () => {
    const productName = 'product A';
    const modelResponse = {
      "id": 1,
      "name": "product A"
    }
    
    describe('When succeed in create a new product', () => {
      const checkResponse = [];

      before(() => {
        sinon.stub(ProductModel, 'checkIfExists').resolves(checkResponse);
        sinon.stub(ProductModel, 'create').resolves(modelResponse);
      });

      after(() => {
        ProductModel.checkIfExists.restore();
        ProductModel.create.restore();
      });

      it('Should return an object as response', async () => {
        const newProduct = await ProductService.create(productName);

        expect(newProduct).to.be.an('object');
        expect(newProduct).to.have.all.keys('id', 'name');
      });
    });

    describe('When the product is already registered', () => {
      const checkResponse = [modelResponse];

      before(() => {
        sinon.stub(ProductModel, 'checkIfExists').resolves(checkResponse);
      });

      after(() => {
        ProductModel.checkIfExists.restore();
      });

      it('Should return an error object', async () => {
        const newProduct = await ProductService.create(productName);
        expect(newProduct).to.be.an('object');
        expect(newProduct).to.have.a.key('error');
      });
    });
  });

  describe('When updated a product', () => {
    describe('When it succeed', () => {
      const modelReponse = {
        id: 1,
        name: 'product A',
        quantity: 10,
      };

      const sucessIdResponse = {
        "id": 1,
        "name": "product A",
      };

      before(() => {
        sinon.stub(ProductModel, 'update').resolves(modelReponse);
        sinon.stub(ProductModel, 'findById').resolves(sucessIdResponse);
      });

      after(() => {
        ProductModel.update.restore();
        ProductModel.findById.restore();
      });

      it('Should return a object with the product', async () => {
        const id = 1;
        const name = 'product A'
        const product = await ProductService.update(id, name);

        expect(product).to.be.an('object');
      });

      it('Should return a object with keys: "id", "name", "quantity"', async () => {
        const id = 1;
        const name = 'product A'
        const product = await ProductService.update(id, name);

        expect(product).to.have.all.keys('id', 'name', 'quantity');
      });

    });

    describe('When it fails', () => {
       before(() => {
        sinon.stub(ProductModel, 'findById').resolves(undefined);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it('Should return an error object', async () => {
        const id = 1;
        const name = 'product A'
        const product = await ProductService.update(id, name);
        expect(product).to.be.an('object');
        expect(product).to.have.a.key('error');
      });
    });
  });

  describe('When delete a product', () => {
    describe('When it succeed', () => {
      const sucessIdResponse = {
        "id": 1,
        "name": "product A",
      };

      before(() => {
        sinon.stub(ProductModel, 'deleteProduct').resolves(true);
        sinon.stub(ProductModel, 'findById').resolves(sucessIdResponse);
      });

      after(() => {
        ProductModel.deleteProduct.restore();
        ProductModel.findById.restore();
      });

      it('Should return true', async () => {
        const id = 1;
        const isDeleted = await ProductService.deleteProduct(id);
        expect(isDeleted).to.be.true;
      });
    });

    describe('When it fails', () => {

      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(undefined);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it('Should return an error object', async () => {
        const id = 1;
        const isDeleted = await ProductService.deleteProduct(id);
        expect(isDeleted).to.be.an('object');
        expect(isDeleted).to.have.a.key('error');
      });
    });
  });

  describe('When search a product by name', () => {
    describe('When succeed', () => {

      const modelReponse = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ];

      before(() => {
        sinon.stub(ProductModel, 'search').resolves([modelReponse]);
      });

      after(() => {
        ProductModel.search.restore();
      });


      it('Should return an array of objects of products that includes that name', async () => {
        const searchTerm = "Martelo"
        const products = await ProductService.search(searchTerm);

        expect(products).to.be.an('array');
      });
    });
  });
});