const express = require('express');
const bodyParser = require('body-parser');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
app.use(bodyParser.json());

// same proto file
const packageDef = protoLoader.loadSync('./customer.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const customerPackage = grpcObject.customer;

const client = new customerPackage.CustomerService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

app.get('/customers', (req, res) => {
  client.ListCustomers({}, (err, response) => {
    if (err) return res.status(500).send(err.message);
    res.json(response.customers);
  });
});

app.listen(3000, () => {
  console.log("Express server listening at http://localhost:3000");
});
