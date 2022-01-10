import { NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AndamentoMensileComponent } from './components/andamento-mensile/andamento-mensile.component';


import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    AndamentoMensileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
