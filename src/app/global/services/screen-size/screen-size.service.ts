import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export enum ScreenSize {
  //XS,MD,LG,XL
  mobile = "mobile",
  web = "web"
}

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  size: any = (window.innerWidth < 1024) ? ScreenSize.mobile : ScreenSize.web;

  resizeObject: Subject<ScreenSize> = new BehaviorSubject<ScreenSize>(this.size);

  constructor() {
  }

  handleObservable(): Observable<ScreenSize> {
    return this.resizeObject.asObservable().pipe(distinctUntilChanged());
  }
  
  triggerResize(size: ScreenSize) {
    this.resizeObject.next(size);
  }

}
