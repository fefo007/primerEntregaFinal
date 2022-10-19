const express = require('express')
const {Router}= require('express')
const {adminMiddleware}=require('../../middlewares/admin')
const routerProducts=Router()
const Api = require('../apis/apiProd')
const apiProd = new Api()
// const fs = require('fs')

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({ extended: true }))

routerProducts.get('/:id?', (req, res) => {
    let selectedProduct = JSON.stringify(apiProd.getById(req.params.id))
    if (selectedProduct){
            res.json(`Su producto es : ${selectedProduct}`)}
    else{
        let completeList=JSON.stringify(apiProd.getAll())
        res.json(`La lista de producto es : ${completeList}`)
    }
});

routerProducts.post('/',adminMiddleware, (req, res) => {
    apiProd.save(req.body)
    let productSaved = JSON.stringify(req.body)
    // fs.writeFileSync('productos.txt',JSON.stringify(productSaved))
    res.json(`Se agrego el producto : ${productSaved}`)
});

routerProducts.put('/:id',adminMiddleware, (req,res)=>{
    let id = parseInt(req.params.id)
    let newProd = req.body
    apiProd.updateById(id,newProd)
    let productUpdated = JSON.stringify(req.body)
    res.json(`Se actualizo correctamente.....la nueva informacion es: ${productUpdated}`)
})

routerProducts.delete('/:id',adminMiddleware,(req,res)=>{
    let id = parseInt(req.params.id)
    let productDeleted =JSON.stringify(apiProd.deleteById(id))
    if (productDeleted){
        res.json(`Se elimino correctamente el producto con id : ${id}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
})

module.exports=routerProducts
