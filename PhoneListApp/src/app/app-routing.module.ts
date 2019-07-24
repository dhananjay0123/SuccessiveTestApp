import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePhoneComponent } from './manage-phone/manage-phone.component';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';


const routes: Routes = [
  { path: '', component: ManagePhoneComponent },
  { path: 'managephone', component: ManagePhoneComponent },
  { path: 'addphone', component: AddPhoneComponent },
  { path: 'updatephone', component: UpdatePhoneComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
