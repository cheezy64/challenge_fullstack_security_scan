const express = require('express');
const morgan = require('morgan');

const app = express();

// Routes

// Middleware
//   Logging
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ msg: 'hey' }));

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));