const { expect } = require('chai');
const sinon = require('sinon');

const SalesService = require('../../../services/salesService');
const SalesModel = require('../../../models/salesModel');

const ProductModel = require('../../../models/productsModel');

describe('TEST SALES SERVICE', () => {
  describe('Test when create a new sale', () => {
    describe('In case that succeed', () => {
      const saleData = [
        {
          "productId": 1,
          "quantity": 3
        }
      ]

      const findResponse = {
        "id": 1,
        "name": "product A",
      };

      const modelResponse = {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      };


      before(() => {
        sinon.stub(SalesModel, 'createSale').resolves(modelResponse);
        sinon.stub(ProductModel, 'findById').resolves(findResponse);
      });

      after(() => {
        SalesModel.createSale.restore();
        ProductModel.findById.restore();
      });

      it('Should create a new sale', async () => {
        const newSale = await SalesService.createSale(saleData);

        expect(newSale).to.be.a('object')
        expect(newSale).to.have.all.keys('id', 'itemsSold');
      });
    });

    describe('In case that fails', () => {
      const findResponse = undefined;
      const modelResponse = undefined;
      const saleData = [
        {
          "productId": 1,
          "quantity": 3
        }
      ]

       before(() => {
        sinon.stub(SalesModel, 'createSale').resolves(modelResponse);
        sinon.stub(ProductModel, 'findById').resolves(findResponse);
      });

      after(() => {
        SalesModel.createSale.restore();
        ProductModel.findById.restore();
      });

      it('Should return an error object', async() => {
        const serviceResponse = await SalesService.createSale(saleData);
        expect(serviceResponse).to.be.an('object');
        expect(serviceResponse).to.have.key('error');
      });
    });
  });

});