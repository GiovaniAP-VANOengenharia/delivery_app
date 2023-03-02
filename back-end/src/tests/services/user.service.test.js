const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../api/services/user.service");
const { User } = require("../../database/models");
const { validUser, validEmail, validPassword } = require('./mocks/user.service.mocks');




describe("Testes controller de users", function () {
    describe("Fazendo login", function () {
        afterEach(function () {
            sinon.restore();
        });
        it('O retorno de getLogin é um objeto?', async function () {
            sinon.stub(User, 'findOne').resolves(validUser);
            const result = await userService.getLogin(validEmail, validPassword);
            expect(result instanceof Object).to.equal(true);
        });
        it('Teste função getLogin', async function () {
            sinon.stub(User, "findOne").resolves(validUser);
            const result = await userService.getLogin(validEmail, validPassword);
            expect(result).to.be.deep.equal(validUser);
        });
    });
    describe("Criando usuário", function () {
        afterEach(function () {
            sinon.restore();
        });
        it('O retorno de getUser é um objeto?', async function () {
            sinon.stub(User, 'findOne').resolves(validUser);
            const result = await userService.getUser(validEmail);
            expect(result instanceof Object).to.equal(true);
        });
        it('Teste função getUser', async function () {
            sinon.stub(User, "findOne").resolves(validUser);
            const result = await userService.getUser(validEmail);
            expect(result).to.be.deep.equal(validUser);
        });
    });
});
