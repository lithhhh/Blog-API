const sinon = require('sinon');
// const request = require('supertest');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const { app } = require('../src/index');
// const { Response } = require('superagent');

// chai.use(chaiHttp);

// request(app).get

// describe('Seu teste', () => {
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
// });