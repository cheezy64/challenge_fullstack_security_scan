require('env-smart').load(); // Load environment variables
const express = require('express');
const jsend = require('jsend');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { jsendErrorHandler } = require('./middleware/errors');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error(err));

// Middleware Logging
app.use(morgan('dev'));
// Middleware Parsing
app.use(express.json());
app.use(jsend.middleware);

// Routes
app.get('/', (req, res) => res.json({ msg: 'hey' }));

// Middleware Errors
app.use(jsendErrorHandler);

// TODO FIXME figure out how to pass environment variable from Docker into dev container correctly.  Works as expected if not using the
// devcontainers needed for VSCode remote development into a docker container
app.listen(3000, () => console.log('Open http://localhost:3000 to see a response.'));
