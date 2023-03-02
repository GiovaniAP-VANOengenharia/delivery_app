const { expect } = require("chai");
const sinon = require("sinon");
const productService = require('../../api/services/product.service');
const productController = require('../../api/controllers/product.controller');
const { products } = require('../services/mocks/products.service.mock');

describe("Testes controller de products", function () {
    describe("Puxando produtos", function () {
        afterEach(function () {
            sinon.restore();
        });
        it('O resultado da função getAllProducts se bem sucedida é um código 200', async function () {
            sinon.stub(productService, 'getAllProducts').resolves(products);
            const req = {};
            const res = {};

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productController.getAllProducts(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });
    });
});
