// REQUIRES
const express = require('express');
const path = require('path');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const recordameMiddleware = require('./middlewares/recordameMiddleware');
const cookieParser = require('cookie-parser');
const { userLogged } = require('./middlewares/userLogged');

// EJECUCIÓN DE EXPRESS
const app = express();

// MIDDLEWARES

const pathPublic = path.join(__dirname, './public');
app.use(express.static(pathPublic));

app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/users')
]);

app.use(session({ secret: 'b00kh0use', resave: false, saveUninitialized: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(recordameMiddleware);
app.use(userLogged);

// ROUTES

app.use('/', mainRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

// LEVANTANDO SERVIDOR

app.listen(process.env.PORT || 3000, () => {
    console.log('servidor funcionando en ' + process.env.PORT || 3000);
});