import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HouseComponentComponent } from './house-component/house-component.component';
import { HouseComponent } from './house/house.component';
import { HousesService } from './houses.service';
//import { HttpClient, HttpHeaders } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HousesListComponent,
    HouseComponentComponent,
    HouseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HousesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
