gRPC (gRPC Remote Procedure Call) is a high-performance, open-source, universal RPC framework developed by Google. It's used to enable communication between services in a microservices architecture or between client-server applications.

grpc-customer-app/
├── customer.proto
├── grpc-server.js
├── express-server.js
├── package.json

Run npm install to install the dependency


1. Run the Servers

In Terminal 1:

node grpc-server.js



In Terminal 2:

node express-server.js


Test Endpoints (Browser/Postman):

GET http://localhost:3000/customer/123

```[
  {
    "id": "1",
    "name": "Alice",
    "email": "alice@example.com"
  },
  {
    "id": "2",
    "name": "Bob",
    "email": "bob@example.com"
  }
]```

POST http://localhost:3000/customer
```{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}```

PUT http://localhost:3000/customer

```
{
  "id": "123",
  "name": "Johnny Updated",
  "email": "johnny@example.com"
}

```


DELETE http://localhost:3000/customer/123
