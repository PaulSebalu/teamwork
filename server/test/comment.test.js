/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Tokenizer from '../helpers/token.helper';

const employeeToken = Tokenizer.createToken({
  employeeId: 1,
  adminAccess: false
});

const { expect } = chai;

chai.use(chaiHttp);

describe('Comment api endpoint', () => {
  it('Endpoint should return a 201 {Created} HTTP status code and confirmation for valid input', done => {
    const newComment = {
      comment: 'Sample comment'
    };
    chai
      .request(app)
      .post('/api/v1/articles/1/comments')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send(newComment)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal('Comment successfully created');
        expect(res.body.data.comment).to.be.equal('Sample comment');
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});
