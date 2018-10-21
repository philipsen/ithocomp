import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HouseComponent } from './house/house.component';

import { HttpClientModule } from '@angular/common/http';
import { HouseDetailComponent } from './house-detail/house-detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminHouseComponent } from './admin/admin-house/admin-house.component';
import { AdminHouseItemComponent } from './admin/admin-house-item/admin-house-item.component';
import { AdminHouseEventComponent } from './admin/admin-house-event/admin-house-event.component';
import { IthoButtonComponent } from './house-detail/itho-button/itho-button.component';
import { IthoStateComponent } from './itho-state/itho-state.component';

@NgModule({
  declarations: [
    AppComponent,
    HousesListComponent,
    HouseComponent,
    HouseDetailComponent,
    MessagesComponent,
    AdminComponent,
    AdminHouseComponent,
    AdminHouseItemComponent,
    AdminHouseEventComponent,
    IthoButtonComponent,
    IthoStateComponent
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
