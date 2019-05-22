import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore} from 'angularfire2/firestore';
import { HttpClient } from "@angular/common/http";
import { DatosX, Especies } from '../interfaz/datos.interface';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  
  datoS : DatosX;
  especie : string;
  constructor(private fire:AngularFirestore,private http: HttpClient,private route : ActivatedRoute) {
    this.route.queryParams.subscribe( params => {
 

     this.datoS.name =  params["name" ];
     this.datoS.gender = params["gender" ];
     this.datoS.hair_color= params["hair_color" ];
     this.datoS.eye_color = params["eye_color" ];
 
    });
   
  
   }

  ngOnInit() {
    
  }


ConsultarEspecies( index : string ){

  this.http.get("https://swapi.co/api/species/"+index).subscribe((data:any) => {
        
         for (var x in data.results){
           this.datoS.nombreEspecie= data.results[x].name;
           break;
           }
          
     });

}

  Save(){
    let idDoc = this.fire.createId();
    console.log(idDoc);
    this.fire.doc("/personajes/"+ idDoc)
    .set(this.datoS);
  }



}
