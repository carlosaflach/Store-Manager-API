const { expect } = require("chai");
const sinon = require("sinon");
const SalesController = require("../../../controllers/salesController");
const SalesService = require("../../../services/salesService");

describe("TEST SALES CONTROLLER", () => {
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    response.end = sinon.stub().returns();
    next = sinon.stub();
  });

  describe("When creates a new sale", () => {
    describe("In succeed case", () => {
      const serviceResponse = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 3,
          },
        ],
      };
      before(() => {
        sinon.stub(SalesService, "createSale").resolves(serviceResponse);
      });

      after(() => {
        SalesService.createSale.restore();
      });

      it("Should return 201 status code.", async () => {
        request.body = [
          {
            productId: 1,
            quantity: 3,
          },
        ];

        await SalesController.createSale(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it("Should return a json object", async () => {
        request.body = [
          {
            productId: 1,
            quantity: 3,
          },
        ];

        await SalesController.createSale(request, response);
        expect(response.json.calledWith(serviceResponse)).to.be.true;
      });
    });

    describe("When fails to create a new sale", () => {
      const serviceResponse = {
        error: {
          code: "notFound",
          message: "Product not found",
        },
      };

      before(() => {
        sinon.stub(SalesService, "createSale").resolves(serviceResponse);
      });

      after(() => {
        SalesService.createSale.restore();
      });

      it("Should return an error object", async () => {
        await SalesController.createSale(request, response, next);
        expect(
          next.calledWith({
            code: "notFound",
            message: "Product not found",
          })
        ).to.be.true;
      });
    });
  });

  describe("When get all sales", () => {
    describe("When succeed", () => {
      const serviceReponse = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      before(() => {
        sinon.stub(SalesService, "getAll").resolves([serviceReponse]);
      });

      after(() => {
        SalesService.getAll.restore();
      });

      it("Should return 200 as status", async () => {
        await SalesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("Should return a json object", async () => {
        const serviceReponse = [
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2,
          },
        ];
        await SalesController.getAll(request, response);
        expect(response.json.calledWith([serviceReponse])).to.be.true;
      });
    });
  });

  describe("When find a sale by id", () => {
    describe("When succeed", () => {
      const serviceReponse = [
        {
          date: "2022-07-09T04:12:02.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-07-09T04:12:02.000Z",
          productId: 2,
          quantity: 10,
        },
      ];

      before(() => {
        sinon.stub(SalesService, "findById").resolves([serviceReponse]);
      });

      after(() => {
        SalesService.findById.restore();
      });

      it("Should return 200 as status", async () => {
        request.params = "1";
        await SalesController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("Should return a json object", async () => {
        const serviceReponse = [
          {
            date: "2022-07-09T04:12:02.000Z",
            productId: 1,
            quantity: 5,
          },
          {
            date: "2022-07-09T04:12:02.000Z",
            productId: 2,
            quantity: 10,
          },
        ];
        request.params = "1";
        await SalesController.findById(request, response);
        expect(response.json.calledWith([serviceReponse])).to.be.true;
      });
    });

    describe("When it fails", () => {
      const serviceReponse = {
        error: {
          code: "notFound",
          message: "Sale not found",
        },
      };

      before(() => {
        sinon.stub(SalesService, "findById").resolves(serviceReponse);
      });

      after(() => {
        SalesService.findById.restore();
      });

      it("Should return an error object", async () => {
        request.params = "1";
        await SalesController.findById(request, response, next);
        expect(
          next.calledWith({
            code: "notFound",
            message: "Sale not found",
          })
        ).to.be.true;
      });
    });
  });

  describe("When delete a sale", () => {
    describe("When succeed", () => {
      before(() => {
        sinon.stub(SalesService, "deleteSale").resolves(true);
      });

      after(() => {
        SalesService.deleteSale.restore();
      });

      it("Should return status 204, and end the request", async () => {
        request.params = "1";
        await SalesController.deleteSale(request, response);
        expect(response.status.calledWith(204)).to.be.true;
      });
    });

    describe("When fails", () => {
      const serviceResponse = {
        error: {
          code: "notFound",
          message: "Sale not found",
        },
      };

      before(() => {
        sinon.stub(SalesService, "deleteSale").resolves(serviceResponse);
      });

      after(() => {
        SalesService.deleteSale.restore();
      });

      it("Should return an object with error", async () => {
        request.params = "1";
        await SalesController.deleteSale(request, response, next);
        expect(
          next.calledWith({
            code: "notFound",
            message: "Sale not found",
          })
        ).to.be.true;
      });
    });
  });

  describe('When update a sale', () => {
    describe('When succeed', () => {

      const serviceReponse = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };

      before(() => {
        sinon.stub(SalesService, 'updateSale').resolves(serviceReponse);
      }); 

      after(() => {
        SalesService.updateSale.restore();
      }); 

      it("Should return 200 as status", async () => {
        request.params = "1";
        request.body = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ];
        await SalesController.updateSale(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("Should return a json object", async () => {
        const serviceReponse = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };
        request.params = "1";
        request.body = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ];
        await SalesController.updateSale(request, response);
        expect(response.json.calledWith(serviceReponse)).to.be.true;
      });
    });

    describe('When it fails', () => { 
      const serviceReponse = {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
      };
      
      before(() => {
        sinon.stub(SalesService, 'updateSale').resolves(serviceReponse);
      });

      after(() => {
        SalesService.updateSale.restore();
      });

      it("Should return an object with error", async () => {
        request.params = "1";
        request.body = [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ];
        await SalesController.updateSale(request, response, next);
        expect(
          next.calledWith({
            code: 'notFound',
          message: 'Sale not found',
          })
        ).to.be.true;
      });
    });
  });
});
