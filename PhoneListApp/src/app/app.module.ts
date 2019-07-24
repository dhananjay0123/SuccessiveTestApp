import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { PhoneComponent } from './phone/phone.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManagePhoneComponent } from './manage-phone/manage-phone.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
@NgModule({
  declarations: [
    AppComponent,
    PhoneListComponent,    
    PhoneComponent,
    NavbarComponent,
    ManagePhoneComponent,
    EditButtonComponent,
    AddPhoneComponent,
    UpdatePhoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,    
    AppRoutingModule,
    AgGridModule
  ],
  entryComponents: [
    EditButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
