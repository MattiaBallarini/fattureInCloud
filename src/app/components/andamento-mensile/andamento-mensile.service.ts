import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anno } from './anno';

@Injectable({
  providedIn: 'root'
})
export class AndamentoMensileService {

  private endPoint: string = "http://staccah.fattureincloud.it/testfrontend/data.json";
  mesi: string[] = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
  ];

  constructor(
    private http : HttpClient
  ) { }


  getAnno(): Observable<Anno>{
    return this.http.get<Anno>(this.endPoint);
  }
}
