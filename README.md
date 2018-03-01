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


Start the basic API server and the client's development server:

    $ npm run develop

This starts two separate HTTP servers:

- `http://127.0.0.1:3000` - The loopback API server
  - `http://127.0.0.1:3000/status` - The loopback status page
  - `http://127.0.0.1:3000/explorer` - The loopback API expolorer
- `http://127.0.0.1:3001` - The development React server

## Server management

### Staging

TBA
