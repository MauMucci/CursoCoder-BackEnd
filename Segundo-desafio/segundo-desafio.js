import fs from 'fs'


class ProductManager {      
      
    constructor(){                   
        this.products = []  
        this.path = "./files/products.json"     
    }
    
    addProducts = ({title,description,price,thumbnail,code,stock}) =>{
        if(!title||!description || !price || !thumbnail || !code || !stock){
            console.log("datos incompletos")
            return null
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(this.products.length === 0){//Si no hay productos en el arreglo => le asignamos el id 1
            product.id = 1;            
            console.log("Primer producto agregado correctamente " + product.code)                         
        }else{             
            this.products.forEach(p => {
                if(p.code === product.code){
                    console.log("Codigo ya utilizado: -" +product.code+ "- Producto no ingresado ")
                    return
                }
                else{
                    console.log("Producto agregado correctamente: " + product.code)                      
                    const lastProduct = this.products [this.products.length-1] 
                    product.id = lastProduct.id + 1;                                                                                                               
                }              
            })
        }  
        this.products.push(product) 
        fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t')) //Agrega al archivo json
        console.log(this.products.length)
        console.log(product.id)     
    }                   

    getProducts = async() => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data)
                console.log("Productos guardados en el archivo: " +JSON.stringify(products,null,'\t'))
                return products
            }
        }
            catch (error) {
                console.log(error)
            }
            return [];
    }
    
     
    getProductById = async (id) => {   
        try{        
           const product = await this.checkId(id)
           if(product){
            return console.log("Producto solicitado: " + JSON.stringify(product,null,'\t'))
           }
           return console.log("NOT FOUND "+ id)
        }

        catch (err){
            console.log(err)
        }        
    }

    

    deleteById = async (id) => {
        //Para este metodo tuve que trabajar con el indice porque con filter no funcionaba
        try{
            const arr = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));            
            let index = arr.findIndex((e) => e.id ===id)
            
            if(index !==-1){ //verif que el index exista
                arr.splice(index,1)
                await fs.promises.writeFile(this.path,JSON.stringify(arr,null,'\t'))
                console.log(arr)
            }
        }catch (err) {
            console.log(err)
        }

      }


    async deleteAll(){
        try{
            this.products = [];
            //await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            await fs.promises.writeFile(this.path,this.products,null,'\t')
        }
        catch (err){
            console.log(err)
        }
      }
    

    updateProduct = async (id,nuevoElemento) => {
        try {
            const arr = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));            
            let index = arr.findIndex((e) => e.id ===id)

            if(index !==-1){ //verif que el index exista
                arr.splice(index,1,nuevoElemento) //indice del elemento que deseamos reemplazar, cantidad de elementos,nuevo elemeento a agregar
                await fs.promises.writeFile(this.path,JSON.stringify(arr,null,'\t'))
                console.log(arr)                                                                        
            }
        }                          
        catch (error) {
            console.log(error)            
        }
    }
}
    //-------------------------------------------------
    let productManager = new ProductManager()

    const prod1 = {
        title:"producto 1",
        description: "este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "code 1",
        stock: 25,        
    }

    const prod2 = {
        title:"producto 2",
        description: "Producto igual al prod1",
        price: 200,
        thumbnail: "Sin imagen",
        code: "code 2",
        stock: 25,        
    }

    const prod3 = {
        title:"producto 3",
        description: "Producto 3",
        price: 300,
        thumbnail: "Sin imagen",
        code: "code 3",
        stock: 30,
    }

    const newProd = {
        title: "producto a upgradear",
        description:"product description",
        price: 400,
        thumbnail:"Sin imagen",
        stock: 1

    }

    productManager.addProducts(prod1)
    productManager.addProducts(prod2) 
    productManager.addProducts(prod3)

    //productManager.deleteAll()
    //productManager.deleteById(1)

    //productManager.deleteById(1)


    //productManager.getProducts()
    productManager.updateProduct(2,newProd)    

  



 