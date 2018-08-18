import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminHouseComponent } from './admin/admin-house/admin-house.component';


const routes: Routes = [
  { path: '', redirectTo: '/houses', pathMatch: 'full' },
  { path: 'houses', component: HousesListComponent },
  { path: 'house/:id', component: HouseDetailComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'admin/house/:id',  component: AdminHouseComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})

export class AppRoutingModule { }
