const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { User } = require('../../src/database/models');
const requestTest = require('../assets/utils');


chai.use(chaiHttp);
chai.should();

describe('testes da rota /login', () => {
  describe('casos de erro', () => {
    it('quando não informamos nenhum dado body', async () => {
      const { status, body } = await requestTest({}, '/login');
      expect(status).to.be.equal(400);
    });

    it('email não informado', async () => {
      const { status, body } = await requestTest({ password: "123456" }, '/login');
      
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" is required');
      expect(status).to.be.equal(400);
    });

    it('email não é uma string', async () => {
      const { status, body } = await requestTest({ email: 1234, password: "123456" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" must be a string');
      expect(status).to.be.equal(400);
    });

    it('email está vazio', async () => {
      const { status, body } = await requestTest({ email: "", password: "123456" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" is not allowed to be empty');
      expect(status).to.be.equal(400);
    });

    it('email não tem formato de email', async () => {
      const { status, body } = await requestTest({ email: "abubleabuble", password: "123456" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" must be a valid email');
      expect(status).to.be.equal(400);
    });

    it('password não informado', async () => {
      const { status, body } = await requestTest({ email: "example@email.com" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" is required');
      expect(status).to.be.equal(400);
    });

    it('password não é um string', async () => {
      const { status, body } = await requestTest({ email: "example@email.com", password: 123456 }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" must be a string');
      expect(status).to.be.equal(400);
    });

    it('password não tem 6 caracteres', async () => {
      const { status, body } = await requestTest({ email: "example@email.com", password: "12345" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" length must be 6 characters long');
      expect(status).to.be.equal(400);
    });

    it('password está vazio', async () => {
      const { status, body } = await requestTest({ email: "example@email.com", password: "" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" is not allowed to be empty');
      expect(status).to.be.equal(400);
    });

    before(() => sinon.stub(User, 'findOne').resolves(false));
    after(() => sinon.restore());
  
    it('quando não há um usuário registrado', async () => {
      const { status, body } = await requestTest({ email: "example@email.com", password: "123456" }, '/login');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Invalid fields');
      expect(status).to.be.equal(400);
    })
  });

  describe('caso de acerto', () => {
    before(() => sinon.stub(User, 'findOne').resolves(true));
    after(() => sinon.restore());

    it('usuário consegue logar com sucesso', async () => {
      const { status, body } = await requestTest({ email: "example@email.com", password: "123456" }, '/login');

      expect(body).to.have.property('token');
      expect(status).to.be.equal(200);
    })
  })
});