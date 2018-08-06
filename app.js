const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.render('demo', JSON.parse(data));
  });
});

app.post('/edited', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const pageData = JSON.parse(data);
    const content = req.body.content;

    Object.keys(content).forEach(contentKey => {
      if (pageData[contentKey] !== undefined) {
        pageData[contentKey] = content[contentKey];
      }
    });

    fs.writeFile('data.json', JSON.stringify(pageData, null, 2), err => {
      if (err) return res.send(err);
      res.send('ok');
    });
  });
});

app.listen(3000);
