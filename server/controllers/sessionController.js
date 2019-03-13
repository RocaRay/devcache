const { Pool } = require("pg");
const pool = new Pool();

const uuid = require('uuid');
const sessionController = {};

// Middleware Methods
sessionController.setCookie = (req, res, next) => {
  let d = new Date(Date.now());
  const tokenOptions = {
    expires: new Date(d.getFullYear(),d.getMonth(), d.getDate()+1),
    httpOnly: true
  }
  res.cookie('ssid', res.locals.token, tokenOptions);
  next();
};

sessionController.startSession = (req, res, next) => {
  const token = uuid();
  res.locals.token = token;

  const query = {
    name: 'create-session',
    text: 'UPDATE accounts SET token = $1 where id = $2;',
    values: [res.locals.token, res.locals.accountid]
  };

  pool.query(query)
  .then(() => {
    next()
    // res.status(201).send(result);
  }).catch(e => next(new Error('Problem - starting session: ' + e)));
};

// TODO: verify session and get the account id if found
sessionController.verifySession = async (req, res, next) => {
  if(!req.cookies.ssid){
    next(new Error('Not authorized for get snippets'));
  }

  const query = {
    text: 'SELECT * FROM accounts WHERE token = $1',
    values: [req.cookies.ssid]
  };

  try{
    const account = await pool.query(query);
    if(account.rowCount){
      res.locals.accountid = account.rows[0].id;
      next();
    }else{
      next();
    }
  }catch(e){
    next(new Error('Session validation issue: ' + e));
  }
}
module.exports = sessionController;