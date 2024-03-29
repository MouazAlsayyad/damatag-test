
## Description
This project is a test for the company Damatag. The project involves creating a Node.js REST API with Authentication for a Task Manager.

I used MongoDB for data storage locally.


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Swagger API Endpoints
You can view the API endpoints by navigating to the Swagger documentation. After running the application, open your web browser and go to http://localhost:3000/api (or the appropriate URL where your application is running) to access the Swagger UI and explore the available endpoints.


## Note on .env File
I have included the .env file in this repository. Please note that it is generally not recommended to include sensitive information such as API keys, passwords, or other secrets in version control. For production use, it is advised to keep your .env file out of version control and securely manage your environment variables.


## Postman Setup
If you prefer to use Postman for testing, you can include the following code snippet in your signup and login requests to automatically set the JWT token in your environment:

Copy code
```bash
$ pm.environment.set("jwt", pm.response.json().token);
```
This code snippet sets the JWT token returned in the response body to a Postman environment variable named "jwt", which you can then use in subsequent requests.

In the "Authorization" field of your requests in Postman, use the "Bearer Token" type and set the token value to `{{jwt}}`. This will automatically use the JWT token stored in the "jwt" environment variable

## API Endpoints
```bash
  POST      http://localhost:3000/users/login
  POST      http://localhost:3000/users/register
  GET       http://localhost:3000/tasks
  POST      http://localhost:3000/tasks
  GET       http://localhost:3000/tasks:taskId
  PUT       http://localhost:3000/tasks:taskId
  DELETE    http://localhost:3000/tasks:taskId

```