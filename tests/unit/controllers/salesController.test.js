const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');


describe('TEST SALES CONTROLLER', () => {
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    response.end = sinon.stub().returns();
    next = sinon.stub();
  });

  describe('When creates a new sale', () => {
    describe('In succeed case', () => {
      const serviceResponse = {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      }
      before(() => {
           sinon.stub(SalesService, 'createSale').resolves(serviceResponse);
         })
  
       after(() => {
         SalesService.createSale.restore();
       });
     
     it('Should return 201 status code.', async () => {
       request.body = [
             {
               "productId": 1,
               "quantity": 3
             }
           ];
  
           await SalesController.createSale(request, response);
           expect(response.status.calledWith(201)).to.be.true;
     });
      
      it('Shoul return a json object', async () => {
        request.body = [
            {
              "productId": 1,
              "quantity": 3
            }
          ];

          await SalesController.createSale(request, response);
          expect(response.json.calledWith(serviceResponse)).to.be.true;

      });
      
    });

    describe('When fails to create a new sale', () => {
      const serviceResponse = {
          error: {
          code: 'notFound',
          message: 'Product not found',
        },
      }

      before(() => {
        sinon.stub(SalesService, 'createSale').resolves(serviceResponse);
      });

      after(() => {
        SalesService.createSale.restore();
      });

      it('Should return an error object', async () => {
        await SalesController.createSale(request, response, next);
        expect(next.calledWith({
          code: 'notFound',
          message: 'Product not found'
        })).to.be.true;
      });      
    });

    
  });
});