import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise ( (resolve, reject)=>{
      this.http.get('https://angular-html-1b6c0.firebaseio.com/productos_idx.json')
             .subscribe((resp:Producto[]) =>{
               this.productos = resp;
               this.cargando = false;
                console.log(resp);
               /* setTimeout( ()=> {
                this.cargando = false;
                },2000);*/
                resolve();
             });  



    });

    
  }

  getProducto(id:string){
   return this.http.get(`https://angular-html-1b6c0.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){

    if( this.productos.length === 0){
      this.cargarProductos().then( ()=> {
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos( termino );
      })

    }else{
      //aplicar producto
      this.filtrarProductos( termino );
    }
    }
    
  

  private filtrarProductos(termino:string){
    /*this.productosFiltrado = this.productos.filter(producto =>{
      console.log(this.productosFiltrado);
      return true;})*/

      termino = termino.toLocaleLowerCase();
      this.productosFiltrados= [];
      
      this.productos.forEach( prod=>{
        const titulo = prod.titulo.toLocaleLowerCase()
        if(prod.categoria.indexOf(termino)>=0  || titulo.indexOf(termino)>=0){
          this.productosFiltrados.push(prod);
        }
      });
  }
}
