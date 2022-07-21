# Store Manager API

## Introduction:

Store Manager is a RESTFul API developed in the Back-end Module at [Trybe](https://www.betrybe.com/)  Web Development course. <br />
It is a sales management system that presents all the CRUD methods.<br />

During this project I was able to implement unit tests for all layers of the MSC model of software architecture. 
This practice ensures greater reliability and security in requests and responses returned to clients.


## Applied Technologies

<ul>
    <li><a href="https://nodejs.org/en/">Node.js<a/></li>
    <li><a href="https://expressjs.com/">Express<a/></li>
    <li><a href="https://www.mysql.com/">MySQL<a/></li>
    <li><a href="https://mochajs.org/">Mocha<a/></li>
    <li><a href="https://www.chaijs.com/">Chai<a/></li>
    <li><a href="https://sinonjs.org/">Sinon<a/></li>
  </ul>
  
## Methodologies:

- Kanban
- Scrum
 
## Instructions

<div>
  <details>
  <summary>:octocat: <strong>Cloning the repository and installing node modules</strong></summary>

  1. Clone the repository

  - `git clone git@github.com:carlosaflach/Store-Manager.git`;

  - Enter in the folder that was created in the cloning process:
    - `cd Store-Manager`;

  2. Install the dependencies

  - `npm install` ou `npm i`;
  </details>
  <details>
  <summary>:game_die: <strong>Configuring the database connection</strong></summary>

  1. Creating the configuration file
  
  - Create an .env file in the project root:
    - `touch .env`;
    
  - Place the following information in the .env file and replace with your credentials:    
    ```
    MYSQL_HOST=localhost
    MYSQL_USER=yourUser
    MYSQL_PASSWORD=yourPassword
    MYSQL_DATABASE=StoreManager
    PORT=3000
    ```
   >NOTE: You will need to create a local database to use this API. In this manual, I called the database name as StoreManager, but you can call it whatever you want. It's just important that you make sure to create one database and configure it at the .env file to the API work properly.
  </details>
  
  <details>
  <summary>:running: <strong>Running the API locally</strong></summary>
  
  - Run the following command in the terminal from the project root::
  
    - `npm start`;
    
  </details>
  
  <details>
  <summary>:whale: <strong>Running via Docker</strong></summary><br>
  <p>If you wanted and have the knowledge of how to use it, there is a file <em><strong>docker-compose</strong></em> in the root of the project, follow the commands create and access the containers:</p>
  
  - At the root of the project run the following command:
  
    - `docker-compose up -d`;
    
  - To access the container terminal, run the following command:
  
    - `docker container exec -it store_manager bash`;
  
  - To close the container terminal, run the command:
  
    - `exit`;
    
  - If you are no longer using containers, run the following command:
  
    - `docker-compose down`;
  </details>
  
  <details>
  <summary>🧪 <strong>Unit Tests</strong></summary><br>
  <p>To see the test coverage of the MSC architecture model:</p>
  
  - Run the following command:
  
    - `npm run test:mocha`;
   
   >NOTE: If you are running the API via docker, run the above command inside the container.
    
  </details>
 
## 📃 Documentation

### API Use Cases

Feature | Route
------- | ------
List all products | GET /products
Create and validate product | POST /products
Update product | PUT /products/:id
Delete product | DELETE /products/:id
Search for title or content using a query string | GET /products/search
List all sales | GET /sales
Register and validate sales | POST /sales
Update sale | PUT /sales/:id
Delete sale | DELETE /sales/:id
<br/>

    
### Methods
    
| Method | Description                                            |
|--------|-------------------------------------------------------|
| GET    | To return one or more registry.          |
| POST   | To create a new registry.                |
| PUT    | To update a registry. |
| DELETE | To remove a registry.                        |
 
### HTTP Response Codes

| Code | Description                                                 |
|--------|-----------------------------------------------------------|
| 200    | OK: The request has succeeded.                     |
| 201    | Created: The request has succeeded and has led to the creation of a resource.                        |
| 204    | No Content: The request has succeeded and delete a registry.                            |
| 400    | Bad Request: The server cannot or will not process the request due to something that is perceived to be a client error.                   |
| 404    | Not Found: The server cannot find the requested resource.                       |
| 422    | Unprocessable Entity: The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. |
| 500    | Internal server error.                                    |

## Products Endpoints
### /products
The products have `id` and `name`
>**Method [GET] - To list all products**
>
> - Response 200 (application/json) - OK
>
> ```json
>  [
>   {
>     "id": 1,
>     "name": "productName"
>   }
> ]
> ```
>
> - Response 400 (application/json) - Bad request:
>
> ```
> Bad request: "name" is required
> ```

### /products/:id

>**Method [GET] - To find a product by id**
>
> The request expects to recieve an `id` number as parameter:
>
>  - Response 200 (application/json) - OK
>  
> ```json
> {
>  "id": 1,
>  "name": "string"
> }
> ```
>  - Response 404 (application/json) - Not found: Product not found
    
    
> **Method [POST] -  To create a new product**
>
> The request body expects to recieve an object with keys `name`
>
> ```json
> {
>   "name": "ProductName"
> } 
> ```
> - Response 201 (application/json) - Created
>
> ```json
> {
>   "id": 1,
>   "name": "ProductName"
> }
> ```
>
> - Response 400 (application/json) - Bad request:
>
> ```
> Bad request: "name" is required
> ```
> 
> - Response 422 (application/json) - Unprocessable Entity:
>
> ```
> Bad request: "name" length must be at least 5 characters long
>
>```

>**Method [PUT] -  To edit a product**
>
> The request expects to recieve an `id` number as parameter:
>
>  - Response 200 (application/json) - OK
>  
> ```json
> {
>  "id": 1,
>  "name": "ProductNewName"
> }
> ```
>  - Response 404 (application/json) - Not found: Product not found

### /products/search

>**Method [GET] - To find a product by search term**
>
> The request expects to recieve a query as parameter:
>
> ```
> {
> Exemple: `"/products/search?q=Hammer`
> } 
> ```
> > - Response 200 (application/json) - OK
>
> ```json
> [
>   {
>     "id": 1,
>     "name": "ProductName"
>   }
> ]
> ```

>**Method [DELETE] -  To delete a product**
>
> The request expects to recieve an `id` number as parameter:
>
>  - Response 204 (application/json) - No content
>  
>  - Response 404 (application/json) - Not found: Product not found

## Sales Endpoints

### /sales

The sales have keys `date`, `sale_id`, `product_id` e `quantity`.

  
>**Method [GET] - To list all sales**
>
> - Response 200 (application/json) - OK
>
> ```json
> [
>   {
>    "date": "string",
>    "productId": 1,
>    "quantity": 10
>   }
> ]
> ```
>
> - Response 404 (application/json) - Not found: Sale not found
>

### /sales/:id

>**Method [GET] - To find a sale by Id**
>
> The request expects to recieve an `id` number as parameter:
>
>  - Response 200 (application/json) - OK
>  
> ```json
>  [
>    {
>      "date": "string",
>      "productId": 1,
>      "quantity": 10
>    }
>  ]
> ```
>  - Response 404 (application/json) - Not found: Product not found

>**Method [PUT] - To update or edit a sale**
>
> The request expects to recieve an `id` number as parameter:<br/>
> The request body expects an array of object as following:
>
> ```javascript
>  [
>    {
>      "productId": 1,
>      "quantity": 1
>    },
>    {
>      "productId": 2,
>      "quantity": 5
>    }
>  ]
> ```
> 
> 
>  - Response 200 (application/json) - OK
>  
> ```json
>  {
>    "saleId": 0,
>    "itemsUpdated": [
>      {
>        "productId": 0,
>        "quantity": 0
>      }
>    ]
>  }
> ```
>  - Response 404 (application/json) - Not found: Product not found

>**Method [DELETE] -  To delete a sale**
>
> The request expects to recieve an `id` number as parameter:
>
>  - Response 204 (application/json) - No content
>  
>  - Response 404 (application/json) - Not found: Product not found
    
## Created By:

- Linkedin - [Carlos A.](https://www.linkedin.com/in/carlosafonsoflach/)
---
All [Trybe](https://www.betrybe.com/) projects use `linters`, `Git` and `GitHub`.<br/>
