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
import { MessagesComponent } from './messages/messages.component';
import { AdminComponentComponent } from './admin/admin-component/admin-component.component';
import { AdminHouseComponentComponent } from './admin/admin-house-component/admin-house-component.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminHouseComponent } from './admin/admin-house/admin-house.component';

@NgModule({
  declarations: [
    AppComponent,
    HousesListComponent,
    HouseComponent,
    HouseDetailComponent,
    MessagesComponent,
    AdminComponentComponent,
    AdminHouseComponentComponent,
    AdminComponent,
    AdminHouseComponent
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
