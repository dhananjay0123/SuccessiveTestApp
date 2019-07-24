import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from '@angular/router';
import { GridApi } from 'ag-grid-community';
import { RestApiService } from '../services/rest-api.service';
import { PhoneDataService } from '../services/phone-data.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html' ,
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent implements ICellRendererAngularComp {
  public params: any;
  gridApi: GridApi;
  constructor(private router: Router, private restApi: RestApiService, public data: PhoneDataService) { }

   agInit(params: any): void {
     this.params = params;
     this.gridApi = params.api;
    }
  public invokeDeleteMethod() {
    let currentRowdata = this.params.data;
    this.restApi.deletePhoneDetail(currentRowdata).subscribe(data => {
      //affter sucessfull post,remove from grid
      var selectedData = this.gridApi.getSelectedRows();
      this.gridApi.updateRowData({ remove: selectedData });
     
    });
         
   

}
  public invokeEditMethod() {
    var currentRowdata = this.params.data;
   
    this.data.changeData(currentRowdata);
   this.router.navigateByUrl('/updatephone');
    }

  refresh(): boolean {
    return false;
  }

}
