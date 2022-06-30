const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');

describe('TEST SALES MODELS', () => {
  describe('When creates a newSale', () => {

    const saleData = [{
      productId: 1,
      quantity: 3
    }]
    
    const modelResponse =  {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }
    describe('When it succeed', () => {

      const executeResponse = [{ insertId: 1}];

      before(() => {
        sinon.stub(connection, 'execute').resolves(executeResponse);
      })

      after(() => {
        connection.execute.restore();
      })

      it('Should return an object with information about the new sale', async () => {
        const newSale = await SalesModel.createSale(saleData);
        expect(newSale).to.be.an('object');
        expect(newSale).to.have.all.keys('id', 'itemsSold');
      });
      
    });
  });

})
