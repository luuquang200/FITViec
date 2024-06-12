
# Notification Service

This service handles sending notifications via gRPC. It includes an endpoint to send emails.

## Proto File
```proto
syntax = "proto3";

option csharp_namespace = "NotificationService.Protos";

package notification;

// The Notification service definition 
service Notification {
  rpc SendEmail (EmailRequest) returns (EmailResponse);
}

// The request message containing the user's email
message EmailRequest {
  string to = 1;
  string subject = 2;
  string body = 3;
}

// The response message containing the status of the email sent
message EmailResponse {
  bool success = 1;
  string message = 2;
}
```

## How to Call the API Endpoint

To call the `SendEmail` API endpoint, you need to create a gRPC client in your programming language of choice. Below is an example using Node.js with the `@grpc/grpc-js` package and `@grpc/proto-loader` package.

### Prerequisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Install gRPC and Proto Loader

```sh
npm install @grpc/grpc-js @grpc/proto-loader
```

### Create a Client Application

1. Create a new directory for your client application.
2. Inside the directory, create a file named `client.js`.
3. Copy the following code into `client.js`:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf file
const PROTO_PATH = path.join(__dirname, 'notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

// Create a gRPC client
const client = new notificationProto.Notification('https://notification-service-otwul2bnna-uc.a.run.app', grpc.credentials.createInsecure());

// Call the SendEmail method
const emailRequest = {
  to: 'example@example.com',
  subject: 'Test Email',
  body: 'This is a test email from gRPC client.',
};

client.SendEmail(emailRequest, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', response);
  }
});
```

### Create the Proto File

In the same directory, create a file named `notification.proto` and copy the proto file content into it.

```proto
syntax = "proto3";

option csharp_namespace = "NotificationService.Protos";

package notification;

// The Notification service definition 
service Notification {
  rpc SendEmail (EmailRequest) returns (EmailResponse);
}

// The request message containing the user's email
message EmailRequest {
  string to = 1;
  string subject = 2;
  string body = 3;
}

// The response message containing the status of the email sent
message EmailResponse {
  bool success = 1;
  string message = 2;
}
```

### Run the Client

In your terminal, navigate to the directory where `client.js` is located and run:

```sh
node client.js
```

This will call the `SendEmail` method on the Notification service and print the response.

