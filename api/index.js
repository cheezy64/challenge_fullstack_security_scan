require('env-smart').load(); // Load environment variables
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const jsend = require('jsend');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { jsendErrorHandler } = require('./middleware/errors');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error(err));

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

// TODO FIXME figure out how to pass environment variable from Docker into dev container
// correctly. Works as expected if not using the devcontainers needed for VSCode remote
// development into a docker container
app.listen(3000, () => console.log('Open http://localhost:3000 to see a response.'));
