# Chatag

## Prerequisites

- git
- The NodeJS version defined in `package.json` + NPM. It is good to use either the `N` or `nvm` node version managers. Currently `8.1.4`.
- MongoDB >= 3.4.X

## Development Setup

    $ nvm install v8.9.4 && nvm use v8.9.4
    $ npm install npm@latest -g
    $ npm config set progress false # (optional npm speed optimization)
    $ git clone git@github.com:krasiyan/chatag.git
    $ cd ./chatag
    $ npm i

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

## Server management

### Staging

TBA
