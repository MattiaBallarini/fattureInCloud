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

  constructor( public andamentoService : AndamentoMensileService) { }


  ngOnInit(): void {
    this.andamentoService.getAnno().subscribe({
      next: risultato =>{
        this.anno = risultato.mese;
      }
    })
  }





}
