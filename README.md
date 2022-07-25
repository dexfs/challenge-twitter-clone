## Description

Posterr - Strider - Challenge

## Documentation

- Import strider-posterr.postman_collection.json to postman.

In this file there are the resources was created and examples sucess and fail.

## Versions

- Node.js 18.4
- npm 8
- PostgreSQL 14.4

## Installation without Docker and docker compose

> Database should be installed and running.
> the database name should be posterr

```bash
$ npm install
```

## users info

```javascript
// users data
const users = [
    {
        id: '4cfe67a9-defc-42b9-8410-cb5086bec2f5',
        username: 'alucard',
        created_at: new Date(),
    },
    {
        id: 'b8903f77-5d16-4176-890f-f597594ff952',
        username: 'anderson',
        created_at: new Date(),
    },
    {
        id: '75135a97-46be-405f-8948-0821290ca83e',
        username: 'seras_victoria',
        created_at: new Date(),
    },
];
```

## Running migration and seeders

```bash
# if will run in a not containerized environment 
# change the .env file in root directory to the value above.
DATABASE_DSN=postgres://postgres:123456@localhost:5432/posterr

# running migrations
npm run db:migrate

# running seeds to insert users
npm run db:seed:all

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# core tests
$ npm run test:@core

# test coverage
$ npm run test:cov
```

## With docker and docker compose

### Versions

- docker compose version v2.4.1
- Docker version 20.10.16

```bash
$ docker compose up db -d
# development  
$ docker compose up app

# production
$ docker compose -f docker-compose.yml -f docker-compose.prod.yml up app
```

## Critique

- If I had more time, I'll improve the tests, adding more integration and e2e tests

### About scaling

**if this project were to grow and have many users and posts, which parts do you think would fail first?**
Depends on what the system has: many users writing posts or many users reading posts and loading a lot of them.
if the system grow with many writers, the database can be fail first the writing process, because the indexes, this
problem can affect the read data from database,
the request for more posts can became slow.

**In a real-life situation, what steps would you take to scale this product? What other types of technology and
infrastructure might you need to use?**

- containerize the application to be facilitate the scale.
- Use an API gateway and load balance.
- Think in cache strategies
- Maybe split the read and write databases, working with an eventual persistence