const { expect } = require("chai");
const sinon = require("sinon");
const { Product } = require('../../database/models');
const productService = require('../../api/services/product.service');
const { products } = require('./mocks/products.service.mock');

describe("Testes service de products", function () {
    describe("Puxando produtos", function () {
        afterEach(function () {
            sinon.restore();
        });
        it('O retorno de getAllProducts é um objeto?', async function () {
            sinon.stub(Product, 'findAll').resolves(products);
            const result = await productService.getAllProducts();
            expect(result instanceof Object).to.equal(true);
        });
        it('Teste função getLogin', async function () {
            sinon.stub(Product, 'findAll').resolves(products);
            const result = await productService.getAllProducts();
            expect(result).to.be.deep.equal(products);
        });
    });
});
