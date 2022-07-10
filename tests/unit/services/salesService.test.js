const { expect } = require("chai");
const sinon = require("sinon");

const SalesService = require("../../../services/salesService");
const SalesModel = require("../../../models/salesModel");

const ProductModel = require("../../../models/productsModel");

describe("TEST SALES SERVICE", () => {
  describe("Test when create a new sale", () => {
    describe("In case that succeed", () => {
      const saleData = [
        {
          productId: 1,
          quantity: 3,
        },
      ];

      const findResponse = {
        id: 1,
        name: "product A",
      };

      const modelResponse = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 3,
          },
        ],
      };

      before(() => {
        sinon.stub(SalesModel, "createSale").resolves(modelResponse);
        sinon.stub(ProductModel, "findById").resolves(findResponse);
      });

      after(() => {
        SalesModel.createSale.restore();
        ProductModel.findById.restore();
      });

      it("Should create a new sale", async () => {
        const newSale = await SalesService.createSale(saleData);

        expect(newSale).to.be.a("object");
        expect(newSale).to.have.all.keys("id", "itemsSold");
      });
    });

    describe("In case that fails", () => {
      const findResponse = undefined;
      const modelResponse = undefined;
      const saleData = [
        {
          productId: 1,
          quantity: 3,
        },
      ];

      before(() => {
        sinon.stub(SalesModel, "createSale").resolves(modelResponse);
        sinon.stub(ProductModel, "findById").resolves(findResponse);
      });

      after(() => {
        SalesModel.createSale.restore();
        ProductModel.findById.restore();
      });

      it("Should return an error object", async () => {
        const serviceResponse = await SalesService.createSale(saleData);
        expect(serviceResponse).to.be.an("object");
        expect(serviceResponse).to.have.key("error");
      });
    });
  });

  describe("When get all sales", () => {
    describe("When succeed", () => {
      const modelResponse = [
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
        sinon.stub(SalesModel, "getAll").resolves([modelResponse]);
      });

      after(() => {
        SalesModel.getAll.restore();
      });

      it("Should return an array of sales", async () => {
        const sales = await SalesService.getAll();

        expect(sales).to.be.an("array");
      });
    });
  });

  describe("When get a sale by id", () => {
    describe("When it succeed", () => {
      const modelResponse = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      before(() => {
        sinon.stub(SalesModel, "findById").resolves([modelResponse]);
      });

      after(() => {
        SalesModel.findById.restore();
      });

      it("Should return an array of sales with that id", async () => {
        const id = 1;
        const sales = await SalesService.findById(id);

        expect(sales).to.be.an("array");
      });
    });

    describe("When it fails", () => {
      before(() => {
        sinon.stub(SalesModel, "findById").resolves(undefined);
      });

      after(() => {
        SalesModel.findById.restore();
      });

      it("Should return an error object", async () => {
        const id = 1;
        const serviceResponse = await SalesService.findById(id);
        expect(serviceResponse).to.be.an("object");
        expect(serviceResponse).to.have.key("error");
      });
    });
  });

  describe("When delete a sale", () => {
    describe("When succeed", () => {
      before(() => {
        sinon.stub(SalesModel, "deleteSale").resolves(true);
      });

      after(() => {
        SalesModel.deleteSale.restore();
      });

      it("Should return true", async () => {
        const id = 1;
        const isDeleted = await SalesService.deleteSale(id);

        expect(isDeleted).to.be.true;
      });
    });

    describe("When it fails", () => {
      before(() => {
        sinon.stub(SalesModel, "findById").resolves(undefined);
      });

      after(() => {
        SalesModel.findById.restore();
      });

      it("Should return an error object", async () => {
        const id = 1;
        const serviceResponse = await SalesService.deleteSale(id);
        expect(serviceResponse).to.be.an("object");
        expect(serviceResponse).to.have.key("error");
      });
    });
  });

  describe("When update a sale", () => {
    describe("When succeed", () => {
      const modelResponse = {
        saleId: 1,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 1,
          },
        ],
      };

      const findByIdResponse = {
        id: 1,
        name: "Martelo de Thor",
      };

      const findSaleByIdResponse = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      before(() => {
        sinon.stub(SalesModel, "updateSales").resolves(modelResponse);
        sinon.stub(ProductModel, "findById").resolves(findByIdResponse);
        sinon.stub(SalesModel, "findById").resolves(findSaleByIdResponse);
      });

      after(() => {
        SalesModel.updateSales.restore();
        ProductModel.findById.restore();
        SalesModel.findById.restore();
      });

      it("Should return an object with updated sale", async () => {
        const array = [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 2,
            quantity: 50,
          },
        ];
        const id = 1;
        const isUpdated = await SalesService.updateSale(array, id);

        expect(isUpdated).to.be.an("object");
      });
    });

    describe("When dont exists a product with that Id to update", () => {
      const findByIdResponse = undefined;

      before(() => {
        sinon.stub(ProductModel, "findById").resolves(findByIdResponse);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it("Should return an error object", async () => {
        const array = [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 2,
            quantity: 50,
          },
        ];
        const id = 1;
        const isUpdated = await SalesService.updateSale(array, id);
        expect(isUpdated).to.be.an("object");
        expect(isUpdated).to.have.key("error");
      });
    });

    describe('When fails because dont exists that sale id', () => {
      const findByIdResponse = {
        id: 1,
        name: "Martelo de Thor",
      };

      before(() => {
        sinon.stub(ProductModel, "findById").resolves(findByIdResponse);
        sinon.stub(SalesModel, "findById").resolves([]);
      });

      after(() => {
        ProductModel.findById.restore();
        SalesModel.findById.restore();
      });

      it("Should return an error object", async () => {
        const array = [
          {
            productId: 1,
            quantity: 10,
          },
        ];
        const id = 1;
        const isUpdated = await SalesService.updateSale(array, id);
        expect(isUpdated).to.be.an("object");
        expect(isUpdated).to.have.key("error");
      });
    });
  });
});
