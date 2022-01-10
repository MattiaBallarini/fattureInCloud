import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AndamentoMensileComponent } from './components/andamento-mensile/andamento-mensile.component';

@NgModule({
  declarations: [
    AppComponent,
    AndamentoMensileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
