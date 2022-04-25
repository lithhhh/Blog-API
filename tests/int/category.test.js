const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { User, Category } = require('../../src/database/models');
const { requestWithAuth, requestTest } = require('../assets/utils');
const jsonCategories = require('../assets/category');


chai.use(chaiHttp);
chai.should();

describe('testes da rota /categories (GET)', () => {
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

      const numHeader = await requestWithAuth({}, '/categories', 'GET', 123);

      expect(numHeader.body).to.have.property('message');
      expect(numHeader.body.message).to.be.equal('Expired or invalid token')  
      expect(numHeader.status).to.be.equal(401);
    });
  });

  describe('casos de acerto', () => {
    before(() => {
      sinon.stub(Category, 'findAllClean').onFirstCall().resolves(jsonCategories)
      sinon.stub(User, 'findOne').onFirstCall().resolves(true);
      sinon.stub(User, 'findOneClean').onFirstCall().resolves({ id: 1 });
    });

    after(() => sinon.restore());

    it('requisição feita com sucesso', async () => {
      const login = await requestTest({
        email: "example@email.com", password: "123456"
      }, '/login');

      const { body, status } = await requestWithAuth({}, '/categories', 'GET', login.body.token);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(jsonCategories);
    });
  });
});