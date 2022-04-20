const sinon = require('sinon');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');


chai.use(chaiHttp);
chai.should();

describe('testes da rota /user (POST)', () => {
  it('quando não informamos nenhum dado no body', async () => {
    const { status } = await chai.request('http://localhost:3000')
    .post('/user')
    .send({});

    expect(status).to.be.equal(400);
  })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});