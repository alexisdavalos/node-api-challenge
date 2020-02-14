const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const server = express();
//import routers
const projectRouter = require('./routers/projectRouter.js')
const actionRouter = require('./routers/actionsRouter.js')
//import database


//middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// use routers - routes - endpoints / pass middleware
server.use("/api/projects", logger, projectRouter)
server.use("/api/actions", logger, actionRouter)

// default base url http://localhost:5000 from index.js
server.get('/', logger,  (req, res) => {
  res.send(`<h2>Node Sprint Challenge!</h2>`);
});

module.exports = server;

//custom middleware

function logger(req, res, next) {
  (req.params.id) ? 
  console.log(`${req.method} Request to ${req.originalUrl} at: ${Date.now()} includes id:${req.params.id}`) :
  console.log(`${req.method} Request to ${req.originalUrl} at: ${Date.now()} `); //requests url of request method
  next(); //moves on
}

