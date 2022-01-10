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
        this.anno.forEach((e) => {
          this.importi?.push(e.importo)//pusho gli importi mensili importi nell'array
          e.selezionato = false; //porto a false selezionato (quando selezionato diventa true il mese cambia classe CSS e diventa verse)
        }); 
        this.importoMax = Math.max(...this.importi); //ricavo l'importo maggiore
      }
    })
  }

  mousePremuto(mese: Mese) : void{
    this.premuto = true;
    if(this.premuto){
      this.azzeraSelezioni(this.anno!)
      mese.selezionato = true;
    }
  }

  mouseOver(mese: Mese) : void{
    if(this.premuto){
      mese.selezionato = !mese.selezionato;
    }
    
  }

  mouseUp() : void{
    this.premuto = false;
  }


  //metodo per azzerare tutte le selezioni (se sono presenti) quando si preme la prima volta
  azzeraSelezioni(anno: Mese[]) : void{
    anno.forEach((e)=>{
      e.selezionato = false;
    })
  }



}
