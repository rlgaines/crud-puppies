// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var pg = require('pg');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
// app.use('/', routes);
var connectionString = 'postgres://localhost:5432/puppies';

  
  app.get('/api/puppies:id', function(req, res, next){
    var responseArr = [];
     pg.connect(connectionString, function(err, client, done){

        if(err){
            done();
            return res.status(500).json({
              status: 'error',
              message: 'something went wrong bruhhhhh'
            });
            
         }
      var query = client.query('Insert into dogs ( breed, name, alive, age) VALUES ('+ newPuppy.breed, newPuppy.name, newPuppy.alive, newPuppy.age +');');
         
     // query.on('row', function(row){
     //  responseArr.push(row);
     // });

     query.on('end', function(){
        res.json({status: 'success', message: 'Inserted new puppy into the pound!'});
        done();
     });
     pg.end();

  });


});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
