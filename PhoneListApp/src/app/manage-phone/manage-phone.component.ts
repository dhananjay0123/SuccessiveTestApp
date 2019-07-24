import { Component, OnInit } from '@angular/core';
import {PhoneListComponent} from '../phone-list/phone-list.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-phone',
  templateUrl: './manage-phone.component.html',
  styleUrls: ['./manage-phone.component.css']
})
export class ManagePhoneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addPhoneDetail() {
    this.router.navigateByUrl('/addphone');
  }

}
