const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('./customer.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const customerPackage = grpcObject.customer;

const customers = new Map();

// Seed some initial data
customers.set("1", { id: "1", name: "Alice", email: "alice@example.com" });
customers.set("2", { id: "2", name: "Bob", email: "bob@example.com" });

const server = new grpc.Server();

server.addService(customerPackage.CustomerService.service, {
  GetCustomer: (call, callback) => {
    const customer = customers.get(call.request.id);
    if (customer) {
      callback(null, customer);
    } else {
      callback(new Error("Customer not found"));
    }
  },
  AddCustomer: (call, callback) => {
    const { id, name, email } = call.request;
    customers.set(id, { id, name, email });
    callback(null, { message: "Customer added" });
  },
  UpdateCustomer: (call, callback) => {
    const { id, name, email } = call.request;
    if (customers.has(id)) {
      customers.set(id, { id, name, email });
      callback(null, { message: "Customer updated" });
    } else {
      callback(new Error("Customer not found"));
    }
  },
  DeleteCustomer: (call, callback) => {
    if (customers.delete(call.request.id)) {
      callback(null, { message: "Customer deleted" });
    } else {
      callback(new Error("Customer not found"));
    }
  },
  ListCustomers: (call, callback) => {
    const list = Array.from(customers.values());
    callback(null, { customers: list });
  },
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log("gRPC server running at http://localhost:50051");
  server.start();
});


