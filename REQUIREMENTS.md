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
- addProduct [token required]:'/orders/:id/products': [POST]
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
- user_id
- status of order (active or complete)
- Table: Orders (id: serical [primary key],user_id:int [foreign key to Users table],status:boolean)

#### order-product

- id
- order_id
- product_id
- quantity
- Table: order-product (id: serical [primary key],quantity,order_id [foreign key to orders table],product_id[foreign key to porduct table])
