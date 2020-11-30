const express = require('express');
const app = express();

app.use(express.static('./dist/angular-ecommerce'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist/angular-ecommerce' }
  );
});

app.listen(process.env.PORT || 8080);