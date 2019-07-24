import { Component, OnInit, Input } from '@angular/core';
import { PhoneDetail } from '../models/phone-detail';
import { RestApiService } from '../services/rest-api.service';
import { PhoneDataService } from "../services/phone-data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.css']
})
export class AddPhoneComponent implements OnInit {
  phoneDetail: PhoneDetail = new PhoneDetail();
  phoneNumber: number;
  constructor(private restApi: RestApiService, private data: PhoneDataService,
  private router: Router) {
   
  }

  ngOnInit() {
  }

  addUpdatePhoneDetail() {
    this.phoneDetail.phoneNumbers = [];
    this.phoneDetail.phoneNumbers.push(this.phoneNumber.toString());
    this.restApi.addUpdatePhoneDetail(this.phoneDetail).subscribe(data => {
      //affter sucessfull post, release selected phone detail
      this.phoneDetail = new PhoneDetail();
      this.router.navigateByUrl('/managephone');

    });
  }

}
