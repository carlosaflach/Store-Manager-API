const { expect } = require('chai');
const sinon = require('sinon');

const ProductsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('TEST PRODUCT MODEL', () => {
  describe('When getting all products', () => {
    describe('In succeed case', () => {
      const response = [
        {
          id: 1,
          name: "product A",
        },
        {
          id: 2,
          name: "product B",
        }
      ]

      before(() => {
        sinon.stub(connection, 'execute').resolves([response]);
      });

      after(() => {
        connection.execute.restore();
      })

      it('Should return an array of objects', async () => {
        const products = await ProductsModel.getAll();
        expect(products).to.be.an('array');
      });

      it('The object should have "id" and "name" attributes', async () => {
        const products = await ProductsModel.getAll();
        products.forEach((product) => {
          expect(product).to.have.all.keys('id', 'name');
        })
      });
    });
  });

  describe('When getting a product by id', () => {
    describe('In succeed case', () => {
      const id = 1;
      const response = {
        "id": 1,
        "name": "product A",
      }

      before(() => {
        sinon.stub(connection, 'execute').resolves([response]);
      })

      after(() => {
        connection.execute.restore();
      })

      it('Should return the product', async () => {
        const modelResponse = await ProductsModel.findById(id);
        expect(modelResponse).to.be.a('object');
        expect(modelResponse).to.be.deep.equal(response);
      });
    });
  });
});