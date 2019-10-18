<div align="center">
  <h1>Teamwork</h1>
</div>
<div align="center">
  <strong>Enabling cordial interactions in an organization</strong>
</div>
<br>
<div align="center">
  Relevant links: <br>
  <span> | </span>
  <a href="https://sebalu.github.io/teamwork/">UI Components</a>
  <span> | </span>
  <a href="https://documenter.getpostman.com/view/5969437/SVtN3BDM">API documentation</a>
  <span> | </span>
    <a href="https://teamwork-ac11.herokuapp.com/">API deployment on Heroku</a>
  <span> | </span>
    <a href="https://www.pivotaltracker.com/n/projects/2397150">PT board</a>
  <span> | </span>
</div>
<br>
<div align="center">
<a href='https://travis-ci.com/sebalu/teamwork'><img src='https://travis-ci.com/sebalu/teamwork.svg?branch=develop' alt='Build Status' /></a>
<a href='https://coveralls.io/github/sebalu/teamwork?branch=ft-article-creation-api-endpoint-2397150'><img src='https://coveralls.io/repos/github/sebalu/teamwork/badge.svg?branch=ft-article-creation-api-endpoint-2397150' alt='Coverage Status' /></a>
<a href="https://codeclimate.com/github/sebalu/teamwork/maintainability"><img src="https://api.codeclimate.com/v1/badges/9b442ad2037e66c92182/maintainability" /></a>
<a href="https://github.com/airbnb/javascript">
  <img src="https://img.shields.io/badge/code%20style-Airbnb-red" alt="Code style: Airbnb">
</a>
</div>

## About Teamwork

Teamwork is an internal social network for organizations’ employees. The goal of this application is to facilitate more interaction between colleagues and facilitate team bonding.

## Get started
Teamwork requires Node.js 10.0+. Checkout the [docs](https://nodejs.org/en/) to see installation guidelines. The code has been built with simplicity, reusability and code quality in mind.

#### Installation guidelines
- Clone the [repository](https://github.com/sebalu/teamwork.git) using ```git clone https://github.com/sebalu/teamwork.git```
- On your command line, switch to the app root directory
- Install dependencies using `npm install`
- create an  ```.env``` file and specify the ```DATABASE_URL```, ```DB_TEST``` and ```secretkey```.
- DB URL format: ```'postgres://postgres:mynameis@localhost:5432/tw-test'```.
- Parameters in the DB URL are the DB type, user, password, DB server URL instance and the DB name.
- Run tests using `npm run test`
- Start the development server using `npm run dev`
- Use [postman](https://www.getpostman.com/downloads/) to test the endpoints listed below

## API endpoints

The following endpoints have been implemented:

<strong>Request header:</strong>
- ``` Content-Type: application/json```

| METHOD       | Endpoint           | Description
| ------------- |:-------------:| -----|
| POST      | /auth/signup | Register an account
| POST      | /auth/signin     | Sign in 

<strong>Request headers:</strong>
- ``` Content-Type: application/json```
- ```Authorization: Bearer<space>token```

| METHOD       | Endpoint           | Description
| ------------- |:-------------:| -----
| POST | /articles | Create a new article
| PATCH      | /articles/:id     | Modify a specific article
| DELETE      | /articles:id     | Delete a specific article
| GET      | /articles/:id     | Get a specific article
| GET      | /feeds?page=<>     | Get paginated articles
| POST      | /articles/:id/comments     | Comment on a specific article
| GET      | /articles/category?category=<>     | Get articles in a specific category

