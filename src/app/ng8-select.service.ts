import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ng8SelectService {

  subject: Subject<any> = new Subject<any>();
  showSelectItemSubject: Subject<any> = new Subject<any>(); // 用来传递选择了的值到下拉列表

  constructor() { }

  sendMySelectOptionState(v) {
    this.subject.next(v);
  }

  getMySelectOptionState(): Observable<any> {
    return this.subject.asObservable();
  }

  // 用来将已选择的值，传递给下拉列表的subject
  sendShowSelectItemSubject(v) {
    this.showSelectItemSubject.next(v);
  }

  getShowSelectItemSubject(): Observable<any> {
    return this.showSelectItemSubject.asObservable();
  }

}
