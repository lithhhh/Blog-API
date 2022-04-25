const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { User } = require('../../src/database/models');
const { requestTest } = require('../assets/utils');

/* 
  * /users
  * testar os erros de body
*/


chai.use(chaiHttp);
chai.should();

describe('testes da rota /user (POST)', () => {
  describe('casos de erro', () => {
    before(() => {
      
    });

    after(() => sinon.restore());

    it('quando não informamos nenhum dado no body', async () => {
      const { status } = await requestTest({}, '/user');
  
      expect(status).to.be.equal(400);
    });

    it('displayName não informado', async () => {
      let { status, body } = await requestTest({
        "email": "exemplo@email.com",
        "password": "123456",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"displayName" is required');
      expect(status).to.be.equal(400);
    });

    it('displayName não é uma string', async () => {
      const { status, body } = await requestTest({
        "displayName": 10,
        "email": "exemplo@email.com",
        "password": "123456",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"displayName" must be a string');
      expect(status).to.be.equal(400);
    });

    it('displayName tem menos de 8 caracteres', async () => {
      const { status, body } = await requestTest({
        "displayName": "abcdefg", // 7 caracteres
        "email": "exemplo@email.com",
        "password": "123456",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"displayName" length must be at least 8 characters long');
      expect(status).to.be.equal(400);
    });

    it('email não informado', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "password": "123456",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" is required');
      expect(status).to.be.equal(400);
    });

    it('email mal informado', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": "diana email",
        "password": "123456",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" must be a valid email');
      expect(status).to.be.equal(400);
    });

    it('email não é string', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": 10,
        "password": "123456",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"email" must be a string');
      expect(status).to.be.equal(400);
    });

    it('password não é passado', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": "example@email.com",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" is required');
      expect(status).to.be.equal(400);
    });

    it('password não é string', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": "example@email.com",
        "password": 123456,
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" must be a string');
      expect(status).to.be.equal(400);
    });

    it('password não tem 6 caracteres', async () => {
      let { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": "example@email.com",
        "password": "1234567",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" length must be 6 characters long');
      expect(status).to.be.equal(400);

      await requestTest({
        "displayName": "diana zambrusk",
        "email": "example@email.com",
        "password": "12345",
        "image": "imagem.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"password" length must be 6 characters long');
      expect(status).to.be.equal(400);
    });

    it('image não é string', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": "example@email.com",
        "password": "123456",
        "image": 123
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('"image" must be a string');
      expect(status).to.be.equal(400);
    });

    before(() => sinon.stub(User, 'findOne').resolves(true));
    after(() => sinon.restore());

    it('quando já há um email registrado', async () => {
      const { status, body } = await requestTest({
        "displayName": "diana zambrusk",
        "email": "example@email.com",
        "password": "123456",
        "image": "123.jpg"
      }, '/user');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('User already registered');
      expect(status).to.be.equal(409);
    });
  });

    describe('caso de acerto', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(false);
        sinon.stub(User, 'create').resolves();
      });
      after(() => sinon.restore());

      it('usuário é cadastrado com sucesso', async () => {
        const { status, body } = await requestTest({
          "displayName": "diana zambrusk",
          "email": "example@email.com",
          "password": "123456",
          "image": "123.jpg"
        }, '/user');

        expect(body).to.have.property('result');
        expect(status).to.be.equal(201);
      });
  });
});