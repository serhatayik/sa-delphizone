require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const imageController = require('./controllers/imageController');
const fileUpload = require('express-fileupload');
const PORT = process.env.port || 8080;
var app= express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.set('/public',path.join(__dirname,'/public/'));
app.set('/images',path.join(__dirname,'/public/images/'));
app.use('/public/',express.static(path.join(__dirname,'public')));
app.use('/public/images/',express.static(path.join(__dirname,'/public/images/')));
app.use('/views',express.static(path.join(__dirname,'views')));
app.engine('hbs',exphbs({ extname: '.hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/Layouts/'}));
app.set('view engine','hbs');
app.use(fileUpload({createParentPath: true, safeFileNames: true, preserveExtension: true }))


app.listen(PORT,()=>{
    console.log('Express Sunucusu Başladı. Aktif Port :'+PORT);
});
app.use('/', imageController);