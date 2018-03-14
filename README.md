# Chatag

- Develop CI [ ![Codeship Status for krasiyan/chatag#develop](https://app.codeship.com/projects/40a62ad0-004d-0136-d6b3-5a0245e77f67/status?branch=#develop)](https://app.codeship.com/projects/279825)
- Master CI [ ![Codeship Status for krasiyan/chatag#master](https://app.codeship.com/projects/40a62ad0-004d-0136-d6b3-5a0245e77f67/status?branch=#master)](https://app.codeship.com/projects/279825)

## Prerequisites

- git
- The Node.js version defined in `package.json` + NPM. It is good to use either the `N` or `nvm` node version managers. Currently `8.1.4`.
- MongoDB >= 3.4.X
- Redis >= 4.0.8

## Development Setup

### Node.js and NPM

  1. Install node.js (via i.e. https://nodejs.org/en/download/package-manager/)

  2. (Optional) Install a node.js version manager via either one of:

  2.1. [NVM](https://github.com/creationix/nvm#installation)

    $ nvm install v8.9.4 && nvm use v8.9.4
    $ npm install npm@latest -g

  2.2. [n](https://github.com/tj/n)

    $ npm install n -g
    $ n v8.9.4

  3. Update NPM to the latest version and make minor config improvements

    $ npm install npm@latest -g
    $ npm config set progress false # (optional npm speed optimization)

### MongoDB

  See the [MongoDB installation page](https://docs.mongodb.com/manual/installation/)

### Redis

  See the [Redis quickstart guide](https://redis.io/topics/quickstart)

  :exclamation: Make sure to always secure your redis deployment. See the [Securing Redis](https://redis.io/topics/quickstart#securing-redis) section of the quickstart guide for more details

### Project

    $ git clone git@github.com:krasiyan/chatag.git
    $ cd ./chatag
    $ npm i
    $ echo REACT_APP_GOOGLE_API_KEY={{YOUR_API_KEY}} > client/.env.development.local
    $ cp .env.sample .env
    $ npm run seed

## Online resources

- [Trello Board](https://trello.com/b/jzVnPHBj/chatag)

## Development tips

Start the API server and the client's development server:

    $ npm run develop

This starts two separate HTTP servers:

- `http://127.0.0.1:3000` - The loopback API server (serving the pre-build client)
  - `http://127.0.0.1:3000/status` - The loopback status page
  - `http://127.0.0.1:3000/explorer` - The loopback API expolorer
- `http://127.0.0.1:3001` - The development React server

Run the API server only:

    $ npm run develop:server

Run the React development server only:

    $ npm run develop:client

Built the React client app, which will be served under `http://127.0.0.1:3000/` (if the API server is running):

    $ npm run build:client

Run the full test pipeline:

    $ npm run test

Run code linter only:

    $ npm run test:lint

Run the client tests only:

    $ npm run test:client

Run the NSP security tests only:

    $ npm run test:posttest

List all available NPM scripts

    $ npm run

## Server management

### Staging

TBA
