const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../api/services/user.service");
const userController = require("../../api/controllers/user.controller");
const { validToken } = require('./mocks/user.controller.mock');
const { validEmail, validPassword, validUser } = require('../services/mocks/user.service.mocks');

describe("Testes controller de users", function () {
    describe("Fazendo login", function () {
        afterEach(async function () {
            sinon.restore();
        });
        it('O resultado da função login se bem sucedida é um código 200', async function () {
            sinon.stub(userService, "getLogin").resolves(validUser);
            const req = {
                body: { email: validEmail, password: validPassword }
            };
            const res = {};

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await userController.login(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });
        it('O resultado da função login se bem sucedida é um código 404', async function () {
            sinon.stub(userService, "getLogin").resolves(false);
            const req = {
                body: { email: validEmail, password: "Password123" }
            };
            const res = {};

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await userController.login(req, res);

            expect(res.status.calledWith(404)).to.be.true;
        });
    });
});