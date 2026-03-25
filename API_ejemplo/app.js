// Import the Express module
const express = require('express');
const cors = require('cors');
// Create an Express application instance
const app = express();
// Define the port the server will listen on
const port = 3000;
// Define a route for the root URL ('/') that sends "Hello World!" as a response
app.use(cors())

app.get('/', (req, res) => {
   res.send('Hello World');
});

app.get('/adios', (req, res) => {
   res.send('Bye Wolrd');
});

app.post('/suma', (req, res) => {
    let x = parseFloat(req.primero);
    let y = parseFloat(req.segundo);
    resultado = x+y;
    res.send(resultado.toString());
});

app.use('/fotoGato',express.static('tama.jpg'))
// Start the server and listen on the specified port
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});