import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HouseComponent } from './house/house.component';
//import { HousesService } from './houses.service';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule }    from '@angular/common/http';
import { HouseDetailComponent } from './house-detail/house-detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HousesListComponent,
    HouseComponent,
    HouseDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
