const envSmart = require('env-smart');


(function loadConfig() {
  envSmart.load({
    envFilename: process.env.ENV_FILE,
  });
}());
