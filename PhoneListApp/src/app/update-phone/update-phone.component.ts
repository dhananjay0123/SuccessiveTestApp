import { Component, OnInit, Input } from '@angular/core';
import { PhoneDetail } from '../models/phone-detail';
import { RestApiService } from '../services/rest-api.service';
import { PhoneDataService } from "../services/phone-data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.css']
})
export class UpdatePhoneComponent implements OnInit {
  phoneDetail: PhoneDetail = new PhoneDetail();
  phoneNumber: string;
  constructor(private restApi: RestApiService, private data: PhoneDataService,
    private router: Router) { }

  ngOnInit() {
    this.data.currentData.subscribe(message => {
      this.phoneDetail = message;
      this.phoneNumber = this.phoneDetail.phoneNumbers[0];

    })
  }
  updatePhoneDetail() {
    this.phoneDetail.phoneNumbers = [];
    this.phoneDetail.phoneNumbers.push(this.phoneNumber.toString());
    this.restApi.addUpdatePhoneDetail(this.phoneDetail).subscribe(data => {
    //affter sucessfull post, release selected phone detail
     this.phoneDetail = new PhoneDetail();
     this.router.navigateByUrl('/managephone');

    });
  }

}
