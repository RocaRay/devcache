const { Pool } = require("pg");
const pool = new Pool();

const sessionController = {};

// Middleware Methods

sessionController.setCookie = (req, res, next) => {
  res.cookie('sessionid', res.locals.sessionid);
  res.cookie('accountid', res.locals.accountid);
  next();
};

sessionController.startSession = (req, res, next) => {
  const query = {
    name: 'create-session',
    text: 'UPDATE accounts SET token = $1 where id = $2;',
    values: [res.locals.session_id, res.locals.accountid]
  };

  pool.query(query)
  .then(result => {
    res.status(201).send(result);
  });
  next()
};

module.exports = sessionController;