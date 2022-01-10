import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AndamentoMensileService } from './andamento-mensile.service';
import { Anno, Mese } from './anno';

@Component({
  selector: 'app-andamento-mensile',
  templateUrl: './andamento-mensile.component.html',
  styleUrls: ['./andamento-mensile.component.scss']
})
export class AndamentoMensileComponent implements OnInit {

  anno?: Mese[];
  premuto: boolean = false; //variabile per tenere traccia dello stato del mouse

  importi: number[] = []; //array che contiene tutti gli importi annuali (su cui verrà eseguito il metodo Math.max per ricavare l'importo maggiore)
  importoMax: number = 0; //importo maggiore di tutto l'anno

  constructor( public andamentoService : AndamentoMensileService) { }


  ngOnInit(): void {
    this.importi = [];

    this.andamentoService.getAnno().subscribe({
      next: risultato =>{
        this.anno = risultato.mesi;
        this.anno.forEach((e) => {this.importi?.push(e.importo)}); //pusho gli importi mensili importi nell'array
        this.importoMax = Math.max(...this.importi); //ricavo l'importo maggiore
      }
    })
  }

  mousePremuto() : void{
    this.premuto = true;
    console.log("hai premuto");
  }

  mouseOver() : void{
    if(this.premuto){
      console.log("Stai selezionando gli elementi");
    }
    
  }

  mouseUp() {
    this.premuto = false;
  }



}
