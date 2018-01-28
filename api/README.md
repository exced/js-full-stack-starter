# Node GraphQL Express API

This repository is a boilerplate to build ES6 NodeJS GraphQL api using Express and DataLoader.

## Getting started

### Install MongoDB
```bash
brew install mongodb
```

### Install dependencies
```bash
yarn
```

### Run MongoDB daemon
```bash
brew services start mongodb
```

### Start
```bash
yarn start
```

Signup :
```bash
curl -X POST http://localhost:8000/signup -d username=user -d password=user
```

Signin :
```bash
curl -X POST http://localhost:8000/signin -d username=user -d password=user
```

You can now check out [GraphiQL explorer](http://localhost:3000/graphiql/explorer) to try your API !