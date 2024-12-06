// Create web server
// Load comments from file
// Add comments to file
// Return comments to client

var express = require('express');
var fs = require('fs');

var app = express();
var port = 3000;

app.use(express.json());

app.get('/comments', function(req, res) {
  fs.readFile('./comments.json', 'utf-8', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments');
      return;
    }

    res.status(200).send(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  var comment = req.body.comment;

  fs.readFile('./comments.json', 'utf-8', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments');
      return;
    }

    var comments = JSON.parse(data);
    comments.push(comment);

    fs.writeFile('./comments.json', JSON.stringify(comments), 'utf-8', function(err) {
      if (err) {
        res.status(500).send('Error writing comments');
        return;
      }

      res.status(200).send('Comment added');
    });
  });
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});