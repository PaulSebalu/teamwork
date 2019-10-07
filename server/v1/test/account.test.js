/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

import {
  validSignUp,
  invalidSignUp,
  SignUp,
  SignIn,
  SignInWithWrongPassword,
  SignInWithUnregisteredEmail
} from './account.mock';

const { expect } = chai;

chai.use(chaiHttp);

describe('User registration endpoint', () => {
  it(
    'Endpoint should return a 201 {Created} HTTP' +
      'status code and confirmation for valid input',
    done => {
      chai
        .request(app)
        .post('/api/v1/signup')
        .send(validSignUp)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal('Successfully signed up');
          done();
        });
    }
  );
  it(
    'Enpoint should return a 400 {Bad request}' +
      'HTTP status code for invalid password',
    done => {
      chai
        .request(app)
        .post('/api/v1/signup')
        .send(invalidSignUp)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal(
            'Your password should be at least 8 characters, ' +
              'containing one uppercase letter, numeric ' +
              'character and lowercase letter.'
          );
          done();
        });
    }
  );
});

describe('User authentication and authorization enpoint', () => {
  beforeEach('Sign up user', done => {
    chai
      .request(app)
      .post('/api/v1/signup')
      .send(SignUp)
      .end(error => {
        if (error) done(error);
        done();
      });
  });
  it(
    'Endpoint should return a 200 {Ok}' +
      'HTTP status code and login confirmation ' +
      'for an existing user wih valid input',
    done => {
      chai
        .request(app)
        .post('/api/v1/signin')
        .send(SignIn)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal(
            'User is successfully logged in'
          );
          expect(res.body.data).to.have.property('token');
          done();
        });
    }
  );
  it(
    'Endpoint should return a 401 {Unauthorized}' +
      'HTTP status code for an invalid password',
    done => {
      chai
        .request(app)
        .post('/api/v1/signin')
        .send(SignInWithWrongPassword)
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.be.equal('Invalid Password');
          done();
        });
    }
  );
  it(
    'Enpoint should return a 404 {Not Found}' +
      'HTTP status code for an invalid email',
    done => {
      chai
        .request(app)
        .post('/api/v1/signin')
        .send(SignInWithUnregisteredEmail)
        .then(res => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.be.equal(
            'An employee with this email does not exist'
          );
          done();
        });
    }
  );
});
