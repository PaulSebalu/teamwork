/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('User authentication and authorization enpoint', () => {
  it('Endpoint should return a 200 {Ok} HTTP status code and login confirmation for an existing user wih valid input', done => {
    const existingEmployee = {
      email: 'paul@example.com',
      password: 'kamulesigo'
    };
    chai
      .request(app)
      .post('/api/v1/signin')
      .send(existingEmployee)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('User is successfully logged in');
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
  it('Enpoint should return a 401 {Unauthorized} HTTP status code for an invalid password', done => {
    const existingEmployee = {
      email: 'paul@example.com',
      password: 'invalidpassword'
    };
    chai
      .request(app)
      .post('/api/v1/signin')
      .send(existingEmployee)
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.be.equal('Invalid Password');
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
  it('Enpoint should return a 404 {Not Found} HTTP status code for an invalid email', done => {
    const existingEmployee = {
      email: 'invalid@email.com',
      password: 'kamulesigo'
    };
    chai
      .request(app)
      .post('/api/v1/signin')
      .send(existingEmployee)
      .then(res => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal(
          'An employee with this email does not exist'
        );
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});
