const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/Files', {useUnifiedTopology: false})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connected');
})

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/api/files', require('./routes/file'));
app.use('/files', require('./routes/show'));
app.use('/download', require('./routes/download'));

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000);