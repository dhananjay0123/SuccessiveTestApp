import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PhoneDetail } from '../models/phone-detail';
@Injectable()

@Injectable({
  providedIn: 'root'
})
export class PhoneDataService {
  private dataSource = new BehaviorSubject(new PhoneDetail());
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(message: PhoneDetail) {
    this.dataSource.next(message)
  }
}
