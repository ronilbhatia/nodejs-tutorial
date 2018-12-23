const express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Ronil',
    likes: [
      'soccer',
      'music'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle this request'
  });
});

app.listen(3000, () => {
  console.log("Server is up on Port 3000");
});
