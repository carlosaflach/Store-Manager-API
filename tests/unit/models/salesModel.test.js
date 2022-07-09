const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');

describe('TEST SALES MODELS', () => {
  describe('When creates a newSale', () => {

    const saleData = [{
      productId: 1,
      quantity: 3
    }];
    
    describe('When it succeed', () => {

      const executeResponse = [{ insertId: 1 }];

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

  describe('When get all sales', () => { 
    describe('When it succeed', () => {
      const modelResponse = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
        }
      ]
      
      before(() => {
        sinon.stub(connection, 'execute').resolves([modelResponse]);
      });

      after(() => {
        connection.execute.restore();
      })

      it('Should return an array of sales', async () => {
        const sales = await SalesModel.getAll();
        expect(sales).to.be.an('array');
      });

      it('The object should have all keys: "saleId", "date", "productId", "quantity"', async () => {
        const sales = await SalesModel.getAll();

        sales.forEach((sale) => {
          expect(sale).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
        });
      });
    });
  });

  describe('When get a sale by id', () => {
    describe('When it succeed', () => {

      const modelResponse = [
        {
          "date": "2022-07-06T22:09:36.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-07-06T22:09:36.000Z",
          "productId": 2,
          "quantity": 10
        }
      ];
      
      before(() => {
        sinon.stub(connection, 'execute').resolves([modelResponse]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Should return an array of object of that sale', async () => {
        const id = 1;
        const sale = await SalesModel.findById(id);

        expect(sale).to.be.an('array');
      });

      it('Each sale should have keys: "date", "productId", "quantity"', async () => {
        const id = 1;
        const sale = await SalesModel.findById(id);

        sale.forEach((s) => {
          expect(s).to.have.all.keys('date', 'productId', 'quantity');
        })
      });
    });
  });

  describe('When delete a sale', () => {
    describe('When succeed', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves(true);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Should return true', async () => {
        const id = 1;
        const isDeleted = await SalesModel.deleteSale(id);
        expect(isDeleted).to.be.true;
      });
    });
  });

  describe('When update a sale', () => {
    describe('When it succeed', () => {
      const modelResponse = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      };

      before(() => {
        sinon.stub(connection, 'execute').resolves(modelResponse);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Should return an object with updated sale', async () => {
        const array = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ];
        const id = 1;
        const isUpdated = await SalesModel.updateSales(array, id);

        expect(isUpdated).to.be.an('object');
      });
    });
  });
});
