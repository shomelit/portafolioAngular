import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo:any [] =[];

  constructor(private http:HttpClient) {
   this.cargarEquipo();
   this.cargarInfo();

   }

   private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina ) =>{
      this.cargada = true;
      this.info = resp;
    });
   }

   private cargarEquipo(){
    this.http.get('https://angular-html-1b6c0.firebaseio.com/equipo.json')
    .subscribe( (resp : any []) =>{
      this.equipo = resp;
    });
   }
}
