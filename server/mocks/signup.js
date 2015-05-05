module.exports = function(app) {
  var express = require('express');
  var signupRouter = express.Router();

  signupRouter.get('/', function(req, res) {
    res.send({
      'signup': []
    });
  });

  signupRouter.post('/', function(req, res) {
    res.send({}).status(200)//.end();
  });

  signupRouter.get('/:id', function(req, res) {
    res.send({
      'signup': {
        id: req.params.id
      }
    });
  });

  signupRouter.put('/:id', function(req, res) {
    res.send({
      'signup': {
        id: req.params.id
      }
    });
  });

  signupRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/signup', signupRouter);
};
