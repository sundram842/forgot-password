import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sidenavSubject = new Subject<boolean>();
  sidenavState$ = this.sidenavSubject.asObservable();

  openSidenav() {
    this.sidenavSubject.next(true);
  }

  closeSidenav() {
    this.sidenavSubject.next(false);
  }
}
