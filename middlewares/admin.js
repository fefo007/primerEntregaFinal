
const adminMiddleware = (req,res,next) => {
    if(req.headers.rol == 'admin'){
        next()
    }
    else
    {
        res.send({ error : -1, 
                descripcion: 'ruta x método y no autorizada' }
                )
    }
}

module.exports={adminMiddleware}