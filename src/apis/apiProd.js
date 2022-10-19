const fs = require('fs')

class Api{
    constructor(){
        this.products=[];
    }
    getAll(){
        return this.products
    }
    getById(idProduct){
        let resultProduct=this.products.find(product=>product.id===Number(idProduct))
            return resultProduct
        }
    async save(product){
        try{
            let idProduc=this.products.length > 0 ? this.products.length+1 : 1
            product.id=idProduc
            this.products.push(product)
            await fs.promises.writeFile('./productos.txt',JSON.stringify(this.products))}
        catch (error){
            console.log('error de escritura')
        }
    }
    deleteById(idProduct) {
        const arrayFiltrado = this.products.filter(products => products.id !== idProduct);
        return this.products=arrayFiltrado
    }
    updateById(idProduc,newProduct){
        newProduct.id=idProduc
        this.products.splice(idProduc-1,1,newProduct)
            return this.getById(idProduc)
}
}

module.exports=Api
