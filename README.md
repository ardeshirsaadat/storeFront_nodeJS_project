# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' : [SHOW]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]: '/users' : [GET]
- Show [token required]: '/users/:id': [GET]
- Create: '/users': [POST]

#### Orders

- Create [token required]:'/orders': [POST]
- Current Order by user (args: user id)[token required]: '/users/:id/orders' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category
- Table: Products (id:serial[primary key], name:varchar, price:int, category:varchar)

#### User

- id
- firstName
- lastName
- password
- Table: Users (id: serial [primary key],fistName:varchar,lastName:varchar,password:varchar)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- Table: Orders (id: serical [primary key],product_id: int [foreign key to Products table],quantity:int,user_id:int [foreign key to Users table],status:boolean)

## Setup

### PostgreSQL

Make sure that you habe PostgreSQL installed, otherwise install [PostgreSQL](https://www.postgresql.org) from their homepage.

```
postgres --version
```

Start Postgres with

```
net start postgresql <your version>
```

and enter the Postgres terminal with

```
psql postgres -U <your username usually postgres>
```

Create the database

```
CREATE DATABASE <db_name>;
```

Connect to the database

```
\c <db_name>
```

Display the tables (no relations should be found)

```
\dt
```

The project will work with your database if you name your environment variables in the .env file.

```
Database: <i.e storefront>
Username: <i.e postgres>
Port: <i.e 5678>
PostgresHost:<i.e 127.0.0.1>
ENV= <i.e test>
Database_test=<i.e storefront_test>

BYCRYPT_PASSWORD=<i.e 'BILBAL'>
saltRounds=<i.e 10>

Token_key=<i.e "sealed">
```

Install the node modules

```
npm install
```

Load the database schema with

```
db-migrate up
```

Run the test suite with

```
npm run test
```

and afterwards reset the test-database with

```
npm run drop-database
```

you can start this API with nodemon

```
npm run start
```

The server runs on localhost:3000 on default.
