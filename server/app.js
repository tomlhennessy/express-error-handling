const express = require('express');
const app = express();

// route definitions
app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.get('/error', (req, res) => {
  throw new Error('Test 500 error')
})

// resource not found middleware
app.use((req, res, next) => {
  const error = new Error("Sorry, the requested resource couldn't be found.");
  error.statusCode = 404;
  next(error);
})


// catch all error middleware
app.use((err, req, res, next) => {
  console.error(err); // log the error for debugging

  const statusCode = err.statusCode || 500; // default to 500 if no status code
  res.status(statusCode).json({
    message: err.message,
    statusCode,
  })
})



const port = 5001;
app.listen(port, () => console.log('Server is listening on port', port));
