// /* eslint-disable no-undef */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';

// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Teamwork API root endpoint', () => {
//   it('Does the application exist?', () => {
//     expect(app).to.be.a('function');
//   });

//   it('Root endpoint should return a 200 {Ok} HTTP status code and a success message', done => {
//     chai
//       .request(app)
//       .get('/')
//       .then(res => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.be.equal('Teamwork API');
//         done();
//       })
//       .catch(err => {
//         return err.message;
//       });
//   });

//   it("Endpoints that haven't been explicitly declared should return a 405 {Method Not Allowed} HTTP status code", done => {
//     chai
//       .request(app)
//       .get('/random/url')
//       .end((err, res) => {
//         expect(res.body.status).to.be.equal(405);
//         expect(res.body.message).to.be.equal('Method not allowed');
//         done();
//       });
//   });
// });
