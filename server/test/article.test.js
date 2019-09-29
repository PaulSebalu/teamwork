/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Tokenizer from '../helpers/token.helper';

const employeeToken = Tokenizer.createToken({
  employeeId: 2,
  adminAccess: false
});

const { expect } = chai;

chai.use(chaiHttp);

describe('Article creation endpoint', () => {
  it('Endpoint should return a 201 {Created} HTTP status code and confirmation for valid input', done => {
    const newArticle = {
      title: 'Article Title',
      article: 'Article body'
    };
    chai
      .request(app)
      .post('/api/v1/article/create')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send(newArticle)
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal('Article successfully created');
        expect(res.body.data.title).to.be.equal('Article Title');
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
  it('Enpoint should return a 403 {Forbidden} HTTP status code for unauthenticated access', done => {
    const newArticle = {
      title: 'Article Title',
      article: 'Article body'
    };
    chai
      .request(app)
      .post('/api/v1/article/create')
      .send(newArticle)
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.equal(
          'Forbidden: Provide a token to proceed'
        );
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});

describe('Article update endpoint', () => {
  it('Endpoint should return a 200 {Ok} HTTP status code and confirmation on article update', done => {
    const updatedArticle = {
      title: 'Updated Title',
      article: 'Updated body'
    };
    chai
      .request(app)
      .patch('/api/v1/article/update/2')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send(updatedArticle)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Article successfully edited');
        expect(res.body.data.title).to.be.equal('Updated Title');
        expect(res.body.data.article).to.be.equal('Updated body');
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
  it('Enpoint should return a 403 {Forbidden} HTTP status code for unauthenticated access', done => {
    const updatedArticle = {
      title: 'Article Title',
      article: 'Article body'
    };
    chai
      .request(app)
      .patch('/api/v1/article/update/2')
      .send(updatedArticle)
      .then(res => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.equal(
          'Forbidden: Provide a token to proceed'
        );
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});

describe('Article deletion endpoint', () => {
  it('Endpoint should return a 204 {No Content} HTTP status code and confirmation of article deletion', done => {
    chai
      .request(app)
      .delete('/api/v1/article/delete/2')
      .set('Authorization', `Bearer ${employeeToken}`)
      .then(res => {
        expect(res).to.have.status(204);
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});

describe('Feeds api endpoint', () => {
  it('Endpoint should return a 200 {Okay} HTTP status code and a queryset composed of all articles', done => {
    chai
      .request(app)
      .get('/api/v1/feeds')
      .set('Authorization', `Bearer ${employeeToken}`)
      .then(res => {
        expect(res).to.have.status(200);
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});

describe('Single article api endpoint', () => {
  it('Endpoint should return a 200 {Okay} HTTP status code', done => {
    chai
      .request(app)
      .get('/api/v1/articles/1')
      .set('Authorization', `Bearer ${employeeToken}`)
      .then(res => {
        expect(res).to.have.status(200);
        done();
      })
      .catch(err => {
        return err.message;
      });
  });
});