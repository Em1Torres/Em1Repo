// Import the Express module
const express = require('express');
// Create an Express application instance
const app = express();
// Define the port the server will listen on
const port = 3000;
// Define a route for the root URL ('/') that sends "Hello World!" as a response
app.get('/', (req, res) => {
   res.send('Hello World');
});

app.get('/adios', (req, res) => {
   res.send('Bye Wolrd');
});

app.get('/variable', (req, res) => {
    let x = "emilio";
    let saludo = "hola";
    x = saludo + " " + x;
    res.send(x);
});
// Start the server and listen on the specified port
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});