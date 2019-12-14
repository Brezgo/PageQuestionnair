const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
var http = require('https');
const fetch = require('node-fetch');

// const myConnection = require('express-myconnection');

// Initializations
const app = express();
// require('./database');

// Settings
//require('./config/app');
app.set('json spaces',2);
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

const host = 'localhost';

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));

// Global Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/home'));


// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Server is listining
app.listen(app.get('port'),host,() => {
  console.log(`Servidor corriendo en http://${host}:${app.get('port')}`);
});