const productos = require('../config/dataBase')

// Obtiene todos los productos
const allProducts = (req, res) => {

    try {
        res.json({
            success: true, 
            message: "Saludos desde la api", 
            info: productos
        })

        
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
     
}

// obtiene 1 producto
const getProduct = (req, res) => {

    try {
        const id = req.params.id
        const productPosicion = productos.findIndex(product => product.id == id);
        if(productPosicion == -1){
            throw new Error("Producto no Existe!")
        }
        productos.map(product => {
            if(id == product.id){
                res.status(200).json({info: product})
            } 
        }) 
        
        
    } catch (error) {
        res.status(404).json({success: false, message: error.message})
    }
}

// crea 1 producto
const createProduct = (req, res) => {
    
    try {
        const {nombre, valor, id} = req.body
        const clave = req.headers.clave
        if(clave === process.env.CLAVE){
            productos.push({
                id,
                nombre,
                valor
            })
            
            res.json({success: true, message: "Se ha creado el producto!", productCreated: nombre })
        } else {
            throw new Error("No tienes acceso a crear un producto!")
        }

       
    } catch (error) {
        res.status(401).json({success: false, message: error.message})
    }
}

const editProduct = (req, res) => {
    
    try {
        const id = req.params.id
        const {nombre, valor} = req.body

        const productPosicion = productos.findIndex(product => product.id == id);

        const productEdit = {
            id: parseInt(id),
            nombre,
            valor
        }

        if(productPosicion == -1){
            throw new Error("malo")
        }

        const products = productos.map(producto => {
            if(id == producto.id){
                return productEdit
            } else {
                return producto
            }
        })


        res.json({
            success: true,
            message: "Se ha edtiado el producto!",
            info: products
        })

        

    } catch (error) {
        res.status(404).json({success: false, message: error.message})
    }
}


const deleteProduct = (req, res) => {
    try {
        const id = req.params.id

        if(!productos.find((product) => product.id !== id)){
            const products = productos.filter((product) => product.id == id)
            delete(productos[id - 1])
            res.json({success: true, message: "Has eliminado un producto", info: products})
        } else {
            throw new Error("Producto no existe!")
        }
    } catch (error) {
        res.status(404).json({success: false, message: error.message})
    }
   
}
 

module.exports = {allProducts, getProduct, createProduct, editProduct, deleteProduct}