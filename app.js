var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRouter = require('./routes/api/index');
var app = express();

app.use(logger('dev'));
app.use(express.json()); //content-type application/json req.body
app.use(express.urlencoded({ extended: false })); //application/x-www-form-urlencoded req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  if(/^\/api/.test(req.path)){
    next();
  }
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
