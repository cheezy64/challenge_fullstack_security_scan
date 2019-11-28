require('env-smart').load(); // Load environment variables
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error(err));

// TODO FIXME figure out how to pass environment variable from Docker into dev container
// correctly. Works as expected if not using the devcontainers needed for VSCode remote
// development into a docker container
app.listen(3000, () => console.log('Open http://localhost:3000 to see a response.'));
