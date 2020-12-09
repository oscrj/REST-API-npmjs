const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./routes/api');
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', api);
app.use(express.static('public'));

app.listen(PORT, () => console.log('server is running...' + 'PORT: ' + PORT));