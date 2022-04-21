const chai = require('chai');

const requestTest = async (json, route) => {
  const { status, body } = await chai
  .request('http://localhost:3000')
  .post(route)
  .send(json);

  return { status, body };
}

module.exports = requestTest;