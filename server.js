const express = require('express')
const app = express()
const routerProducts=require('./src/routes/routesProd')
const routerCart=require('./src/routes/routesCart')

app.use(express.static('public'))
app.use('/api/productos',routerProducts)
app.use('/api/carrito',routerCart)

app.get('/', (req, res) => {
    res.render('pages/index');
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))