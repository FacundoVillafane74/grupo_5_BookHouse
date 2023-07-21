const express = require('express');
const path = require('path');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');

const app = express();

const pathPublic = path.join(__dirname, './public');
app.use(express.static(pathPublic));

app.use('/', mainRouter);

app.use('/product', productRouter);

app.use('/cart', cartRouter);

app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('servidor con el puerto 3000 funcionando');
});