const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { User } = require('../../src/database/models');
const { requestWithAuth } = require('../assets/utils');


chai.use(chaiHttp);
chai.should();

describe('testes da rota /category (GET)', () => {
  describe('casos de erro', () => {

    before(() => sinon.stub(User, 'findOne').resolves(true));
    after(() => sinon.restore());

    it('token não foi informado', async () => {
      const { body, status } = await chai
      .request('http://localhost:3000')
      .get('/categories');

      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Token not found')  
      expect(status).to.be.equal(401);
    })

    it('token informado é inválido', async () => {
      const emptyHeader = await requestWithAuth({}, '/categories', 'GET', '');

      expect(emptyHeader.body).to.have.property('message');
      expect(emptyHeader.body.message).to.be.equal('Token not found')  
      expect(emptyHeader.status).to.be.equal(401);

      const minHeader = await requestWithAuth({}, '/categories', 'GET', '');

      expect(minHeader.body).to.have.property('message');
      expect(minHeader.body.message).to.be.equal('Token not found')  
      expect(minHeader.status).to.be.equal(401);
    });
  });

  describe('casos de acerto', () => {
    it('requisição feita com sucesso', async () => {
/*       const { body: { token }, status } = await requestTest({

      }, '/login'); */
    });
  });
});