import { Component, OnInit } from '@angular/core';
import { AndamentoMensileService } from './andamento-mensile.service';
import { Mese } from './anno';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-andamento-mensile',
  templateUrl: './andamento-mensile.component.html',
  styleUrls: ['./andamento-mensile.component.scss'],
  animations: [
      trigger('crescita', [
        transition(':enter', [
          style({ transform: 'translate3d(0,100%,0)'}),
          animate(500, style({ transform: 'translate3d(0, 0, 0)' }))]
          )
      ])
  ]
})

export class AndamentoMensileComponent implements OnInit {

  anno?: Mese[];
  premuto: boolean = false; //variabile per tenere traccia dello stato del mouse

  importi: number[] = []; //array che contiene tutti gli importi annuali (su cui verrà eseguito il metodo Math.max per ricavare l'importo maggiore)
  importoMax: number = 0; //importo maggiore di tutto l'anno

  info?: string; //info per l'utente sulla selezione

  mesiSelezionati: any[] = [];


  constructor( public andamentoService : AndamentoMensileService) {}


  ngOnInit(): void {
    this.importi = [];

    //richiamo i dati
    this.andamentoService.getAnno().subscribe({
      next: risultato =>{
        this.anno = risultato.mesi;

        this.anno.forEach((e) => {
          this.importi?.push(e.importo)//pusho gli importi mensili importi nell'array
          e.selezionato = false; //porto a false selezionato (quando selezionato diventa true il mese cambia classe CSS e diventa verde)
        }); 

        this.importoMax = Math.max(...this.importi); //ricavo l'importo maggiore dall'array

        this.setAltezza(this.anno, this.importoMax); //ricavo l'altezza in proporzione a importoMax
        
      }
    })
  }



  //metodo richiamato quando si preme il mouse su un componente
  mousePremuto(mese: Mese, indice: number) : void{
    this.mesiSelezionati = []; //svuoto l'array dei mesi selezionati

    this.premuto = true;
    if(this.premuto){
      this.azzeraSelezioni(this.anno!); //azzero tutti gli elementi selezionati
      mese.selezionato = true; //seleziono l'elemento premuto

      this.info = "Trascina per selezionare un intervallo di mesi"; //scrivo le info per l'utente
      this.mesiSelezionati.push(this.andamentoService.mesi[indice]); //popolo l'array dei mesi selezionati che viene stampato sotto il componente
    }
  }

  //metodo richiamato quando tenendo premuto passo con il cursore sopra un componente
  mouseOver(mese: Mese, indice: number) : void{
    //controllo se si sta tenendo premuto il mouse
    if(this.premuto){
      mese.selezionato = true;

      this.info = "Rilascia il mouse per confermare la selezione"; //scrivo le info per l'utente

      //popolo l'array dei mesi selezionati che viene stampato sotto il componente
      let presente = this.mesiSelezionati.find( //Verifico che il mese non sia già presente nell'array dei mesi selezionati
        (e) => e.numero === this.andamentoService.mesi[indice].numero
      )
      if(!presente){ //se non è presente, allora pusho
        this.mesiSelezionati.push(this.andamentoService.mesi[indice]);

        //riordino l'array
        this.mesiSelezionati.sort(function(a, b) { 
          return a.numero - b.numero;
        });
      }
    }
  }

  mouseRilasciato() : void{
    this.premuto = false;
    this.info = "";
  }


  //metodo per azzerare tutte le selezioni (se sono presenti) quando si preme la prima volta
  azzeraSelezioni(anno: Mese[]) : void{
    anno.forEach((e)=>{
      e.selezionato = false;
    })
  }

  setAltezza(anno: Mese[], numeroMassimo: number) : void{
    anno.forEach((e)=>{
      //mi ricavo l'altezza del mese facendo la proporzione   importo : x = importoMax : 100   , poi utilizzo toFixed() per tenere solo 4 valori decimali
      //infine converto tutto in Number (perché toFixed converte in stringa)
      e.altezza = Number( ((e.importo*100)/numeroMassimo).toFixed(4) );
    })
  }


}
