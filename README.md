# Feature

**TypeORM - MySQL**

Already supports using mysql database. Don't forget to create a local env. Change the **.env.example** file to **.env**, and create a new database with the name **books_api**.

**Swagger**

The documentation can be opened on the [doc](http://localhost:3000/doc/#/) ([http://localhost:3000/doc/#/](http://localhost:3000/doc/#/)) page.

**JWT Token**

Supported by JSON Web Token (JWT) security

# Getting Started

```bash
npm run start:dev
# or
yarn start:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Rest Full API

There are several main endpoints

## Auth

**Login**, can be accessed on [http://localhost:3000/auth/login](http://localhost:3000/auth/login) method POST

**Refresh Token**, can be accessed on [http://localhost:3000/auth/refresh-token](http://localhost:3000/auth/refresh-token) method POST

**Revoke Refresh Token**, can be accessed on [http://localhost:3000/auth/revoke/:id](http://localhost:3000/auth/revoke/:id) method PATCH

**Register**, can be accessed on [http://localhost:3000/auth/register](http://localhost:3000/auth/register) method POST

## User

Get all data, can be accessed on [http://localhost:3000/users](http://localhost:3000/users) method GET

Get data by ID, can be accessed on [http://localhost:3000/users/:id](http://localhost:3000/users/:id) method GET

Create data, can be accessed on [http://localhost:3000/users](http://localhost:3000/users) method POST

Update data, can be accessed on [http://localhost:3000/users](http://localhost:3000/users) method PUT

Delete by ID, can be accessed on [http://localhost:3000/users/:id](http://localhost:3000/users/:id) method DELETE

## Books

Get all data, can be accessed on [http://localhost:3000/books](http://localhost:3000/books) method GET

Get data by ID, can be accessed on [http://localhost:3000/books/:id](http://localhost:3000/books/:id) method GET

Create data, can be accessed on [http://localhost:3000/books](http://localhost:3000/books) method POST

Update data, can be accessed on [http://localhost:3000/books](http://localhost:3000/books) method PUT

Delete by ID, can be accessed on [http://localhost:3000/books/:id](http://localhost:3000/books/:id) method DELETE
