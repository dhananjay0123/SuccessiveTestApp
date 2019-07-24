import { Component, OnInit } from '@angular/core';
import { GridOptions, ColDef, GridApi, ColumnApi } from "ag-grid-community"
import { PhoneDetail } from '../models/phone-detail';
import { RestApiService } from '../services/rest-api.service';
import { EditButtonComponent } from "../edit-button/edit-button.component";
import { PhoneDataService } from "../services/phone-data.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {

   rowData: PhoneDetail[];
   gridApi: GridApi;
   columnApi: ColumnApi;
   columnDefs: ColDef[];
   rowSelection;

  constructor(public restApi: RestApiService, public router: Router,
    public data: PhoneDataService) {
  this.columnDefs = [
      {
        headerName: 'First Name', field: 'firstName', sortable: true, 
        headerCheckboxSelectionFilteredOnly: true,  editable: true , 
      },
      {
        headerName: 'Last Name', field: 'lastName', sortable: true, editable: true, 
      },
      {
        headerName: 'Phone Number', field: 'phoneNumbers', sortable: false, editable: true, 
      },
      {
                 
        cellRendererFramework: EditButtonComponent,        
        colId: "edit"
      }
    
    ];
    this.rowSelection = "single";
}

  ngOnInit() {  
    this.restApi.getPhoneDetails().subscribe(data => {
      this.rowData = data;
    });
  }

onGridReady(params): void {
    this.gridApi = params.api;
  this.columnApi = params.columnApi;
  params.restApi = this.restApi;
  params.router = this.router;
  params.data = this.data
   
}
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();    
    
    this.data.changeData(selectedRows[0]);
  }

}
