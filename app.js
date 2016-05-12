var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var guest_book_app = express();

guest_book_app.set('views', path.resolve(__dirname, 'views'));
guest_book_app.set('view engine', 'ejs');

// create global array to store the guest list
var entries = [];
guest_book_app.locals.entries = entries;

guest_book_app.use(logger('dev'));

guest_book_app.use(bodyParser.urlencoded({extended: false}));

guest_book_app.get('/', function(req, res){
  res.render('index');
});

// get the new_entry page
guest_book_app.get('/new_entry', function(req, res){
  res.render('new_entry');
});

// post the new entry at the new_entry page
guest_book_app.post('/new_entry', function(req, res){
  if(!req.body.title || !req.body.body){
    res.status(400).send('Entries must have a title and a body');
    return;
  } else {
    // add a new entry and push it in the array
    entries.push({
      title: req.body.title,
      content: req.body.body,
      published_date: new Date()
    });

    // after the new entry saved, it will redirect to the root page
    res.redirect('/');
  }
});

// get the specific entry
guest_book_app.get('/entry/:id', function(req, res){
  res.render('entry/:id');
});

guest_book_app.use(function(req, res){
  res.status(404).render('404');
});

guest_book_app.listen(3000, function(){
  console.log('Express is running on port 3000');
})
