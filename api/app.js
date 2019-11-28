const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const jsend = require('jsend');
const morgan = require('morgan');

const { jsendErrorHandler } = require('./middleware/errors');

const app = express();

// Middleware Security
app.use(cors());
app.use(helmet());

// Middleware Logging
app.use(morgan('dev'));
// Middleware Parsing
app.use(express.json());
app.use(jsend.middleware);

// Routes
const { listRoute, resultRoute } = require('./components/scan')(app);

app.get('/', (req, res) => res.json({ msg: 'hey' }));
app.use('/api/scan', listRoute);
app.use('/api/scan', resultRoute);

// Middleware Errors
app.use(jsendErrorHandler);

module.exports = app;
