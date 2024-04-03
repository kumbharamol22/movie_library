import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { BlockCardComponent } from './shared/block-card/block-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './shared/component/confirmation-popup/confirmation-popup.component';
import { TrimValueDirective } from './shared/directive/trim-value.directive';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    BlockCardComponent,
    ConfirmationPopupComponent,
    TrimValueDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
