import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anno } from './anno';

@Injectable({
  providedIn: 'root'
})
export class AndamentoMensileService {

  private endPoint: string = "http://staccah.fattureincloud.it/testfrontend/data.json";


  mesi: any[] = [
    { numero: 1,
      mese: "Gennaio"
    },
    { numero: 2,
      mese: "Febbraio"
    },
    { numero: 3,
      mese: "Marzo"
    },
    { numero: 4,
      mese: "Aprile"
    },
    { numero: 5,
      mese: "Maggio"
    },
    { numero: 6,
      mese: "Giugno"
    },
    { numero: 7,
      mese: "Luglio"
    },
    { numero: 8,
      mese: "Agosto"
    },
    { numero: 9,
      mese: "Settembre"
    },
    { numero: 10,
      mese: "Ottobre"
    },
    { numero: 11,
      mese: "Novembre"
    },
    { numero: 12,
      mese: "Dicembre"
    }
  ];

  constructor(
    private http : HttpClient
  ) { }


  getAnno(): Observable<Anno>{
    return this.http.get<Anno>(this.endPoint);
  }
}
