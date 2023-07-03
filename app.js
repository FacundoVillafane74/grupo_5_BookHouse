const express = require('express');
const path = require('path');

const app = express();

const pathPublic = path.join(__dirname, './public');
app.use(express.static(pathPublic));

app.get('/', (req, res) => {
    const ruta = path.join(__dirname, './views/index.html');
    res.sendFile(ruta);
})

app.get('/productDetail', (req, res) => {
    const ruta = path.join(__dirname, './views/productDetail.html');
    res.sendFile(ruta);
})

app.get('/cart', (req, res) => {
    const ruta = path.join(__dirname, './views/productCart.html');
    res.sendFile(ruta);
})



app.listen(3000, () => {
    console.log('servidor con el puerto 3000 funcionando');
});