import { Component } from '@angular/core';
import { Router , NavigationExtras} from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import { HttpClient } from "@angular/common/http";

import { ModalController } from '@ionic/angular';
import { DatosX, Especies } from '../interfaz/datos.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name:string;
  personaje:string  = "";


  constructor( private fire:AngularFirestore, private http: HttpClient ,
    private route: Router ){
   
    this.Consultar();

  }

  nombreEspecie :string;


  irExtras( index: number ){
    let navegationExtras : NavigationExtras = {
      queryParams:{
        "datoS" : index,
        "name": this.datos[index].name,
        "gender": this.datos[index].gender ,
        "hair_color": this.datos[index].hair_color,
        "eye_color": this.datos[index].eye_color

      }
    };
    this.route.navigate(['/detalle'], navegationExtras);
  }


  /*
  this.datoS.name = data.results.name;
           this.datoS.height = data.results.height;
           this.datoS.homeworld = data.results.homeworld;
           this.datoS.gender = data.results.gender;
           this.datoS.hair_color = data.results.hair_color;
           this.datoS.especie = data.results.species[0].split('/')[5]; 
           this.datoS.eye_color= data.results.eye_color;*/
  
/*
  async presentModal( index : number) {
    this.ConsultarEspecies(index);
    const modal = await this.modalController.create({
      component: DetallePage,
      componentProps: { 
        datoS : this.datos[index]  }
        });
    return await modal.present();
  }
*/


  ConsultarEspecies( index : number ){
     
    this.http.get("https://swapi.co/api/species/"+this.datos[index].especie).subscribe((data:any) => {
          
           for (var x in data.results){
            this.datos[index].nombreEspecie= data.results[x].name;
             break;
             }
            
       });
  
  }

  

datoS : DatosX;
datos : DatosX[] = [];

Consultar(){
  this.datos = [];
  this.http.get("https://swapi.co/api/people/").subscribe((data:any) => {
         
  
         var contador = 0;
         for (var x in data.results){
          
           this.datos.push({
             name: data.results[x].name, 
             height: data.results[x].height,
             homeworld: data.results[x].homeworld,
             gender: data.results[x].gender,
             hair_color: data.results[x].hair_color,
             especie : data.results[x].species[0].split('/')[5], 
             eye_color: data.results[x].eye_color});
          
           contador++;
           if(contador > 15) break;
           }
     });

}



}
