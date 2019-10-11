/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

import {
  validSignUp,
  newArticle,
  updatedArticle,
  newComment,
  validSignIn
} from './article.mock';

const { expect } = chai;

chai.use(chaiHttp);

let employeeToken;

let articleId;

describe('Article creation endpoint', () => {
  before('Create user', done => {
    chai
      .request(app)
      .post('/api/v2/signup')
      .send(validSignUp)
      .end((error, res) => {
        employeeToken = res.body.data.token;
        if (error) done(error);
        done();
      });
  });
  it(
    'Endpoint should return a 201 {Created} HTTP ' +
      'status code and confirmation for valid input',
    done => {
      chai
        .request(app)
        .post('/api/v2/article/create')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send(newArticle)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal('Article successfully created');
          expect(res.body.data.title).to.be.equal('Article Title');
          articleId = res.body.data.articleId;
          done();
        });
    }
  );
  it(
    'Enpoint should return a 403 {Forbidden} HTTP status ' +
      'code for unauthenticated access',
    done => {
      chai
        .request(app)
        .post('/api/v2/article/create')
        .send(newArticle)
        .then(res => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.be.equal(
            'Forbidden: Provide a token to proceed'
          );
          done();
        });
    }
  );
});

describe('Article update endpoint', () => {
  it(
    'Endpoint should return a 200 {Ok} HTTP status ' +
      'code and confirmation on article update',
    done => {
      chai
        .request(app)
        .patch(`/api/v2/article/update/${articleId}`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .send(updatedArticle)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal('Article successfully edited');
          expect(res.body.data.title).to.be.equal('Updated Title');
          expect(res.body.data.article).to.be.equal('Updated body');
          done();
        });
    }
  );
  it(
    'Enpoint should return a 403 {Forbidden} HTTP status code ' +
      'for unauthenticated access',
    done => {
      chai
        .request(app)
        .patch(`/api/v2/article/update/${articleId}`)
        .send(updatedArticle)
        .then(res => {
          expect(res).to.have.status(403);
          expect(res.body.message).to.be.equal(
            'Forbidden: Provide a token to proceed'
          );
          done();
        });
    }
  );
});

describe('Single article api endpoint', () => {
  it('Endpoint should return a 200 {Okay} HTTP status code', done => {
    chai
      .request(app)
      .get(`/api/v2/article/${articleId}`)
      .set('Authorization', `Bearer ${employeeToken}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.data.title).to.be.equal('Updated Title');
        expect(res.body.data.article).to.be.equal('Updated body');
        done();
      });
  });
});

describe('Comment api endpoint', () => {
  it('Endpoint should return a 201 {Created} HTTP status code and confirmation for valid input', done => {
    chai
      .request(app)
      .post(`/api/v2/article/${articleId}/comments`)
      .set('Authorization', `Bearer ${employeeToken}`)
      .send(newComment)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal('Comment successfully created');
        expect(res.body.data.comment).to.be.equal('Sample comment');
        done();
      });
  });
});

describe('Article deletion endpoint', () => {
  before('Sign in Employee', done => {
    chai
      .request(app)
      .post('/api/v2/signin')
      .send(validSignIn)
      .end((error, res) => {
        employeeToken = res.body.data.token;
        if (error) done(error);
        done();
      });
  });
  it(
    'Endpoint should return a 204 {No Content} HTTP ' +
      'status code and confirmation of article deletion',
    done => {
      chai
        .request(app)
        .delete(`/api/v2/article/delete/${articleId}`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal('Article successfully deleted');
          done();
        });
    }
  );
});

describe('Feeds api endpoint', () => {
  it(
    'Endpoint should return a 200 {Okay} HTTP status code ' +
      'and a queryset composed of all articles',
    done => {
      chai
        .request(app)
        .get('/api/v2/feeds')
        .set('Authorization', `Bearer ${employeeToken}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('page');
          expect(res.body.data).to.be.a('array');
          done();
        });
    }
  );
});
