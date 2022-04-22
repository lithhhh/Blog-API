const chai = require('chai');

const requestTest = async (json, route) => {
  const { status, body } = await chai
  .request('http://localhost:3000')
  .post(route)
  .send(json);

  return { status, body };
}

const requestWithAuth = async (json, route, type, header) => {
  switch(type) {
    case 'GET':
      const get = await  chai
      .request('http://localhost:3000')
      .get(route)
      .set('authorization', header);

      return get;

    case 'POST': 
      const post = await chai
      .request('http://localhost:3000')
      .post(route)
      .set('authorization', header)
      .send(json);

      return post;
  }
}

module.exports = { requestTest, requestWithAuth };