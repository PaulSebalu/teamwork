/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('User registration enpoint', () => {
  it('Endpoint should return a 201 {Created} HTTP status code and confirmation for valid input', done => {
    const newEmployee = {
      firstName: 'Paul',
      lastName: 'Sebalu',
      email: 'paul@example.com',
      password: 'kamulesigo',
      gender: 'm',
      jobRole: 'Techy',
      department: 'Qualass',
      address: 'Kimironko'
    };
    chai
      .request(app)
      .post('/api/v1/signup')
      .send(newEmployee)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal('Successfully signed up');
        expect(res.body.newEmployee.email).to.be.equal('paul@example.com');
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
  it('Enpoint should return a 422 {Unprocessable Entity} HTTP status code for invalid input', done => {
    const newEmployee = {
      firstName: 'Paul',
      lastName: 'Sebalu',
      email: 'paul',
      password: 'kamulesigo',
      gender: 'm',
      jobRole: 'Techy',
      department: 'Qualass',
      address: 'Kimironko'
    };
    chai
      .request(app)
      .post('/api/v1/signup')
      .send(newEmployee)
      .then(res => {
        expect(res).to.have.status(422);
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});
