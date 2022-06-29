const { expect } = require('chai');

const ProductsModel = {
  create: () => { }
};

describe('TEST PRODUCT MODEL', () => {
  describe('When getting all products', () => {
    describe('In succeed case', () => {

      it('Should return an array of objects', async () => {
        const products = await ProductsModel.getAll();
        expect(products).to.be.an('array');
      });

      it('The object should have "id", "name" and "quantity" attributes', async () => {
        const products = await ProductsModel.getAll();
        products.forEach((product) => {
          expect(product).to.have.all.keys('id', 'name', 'quantity');
        })
      });
    });
  })
});