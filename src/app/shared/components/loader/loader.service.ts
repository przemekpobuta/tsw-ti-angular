import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // private loaderSubject = new Subject<LoaderState>();
  // loaderState = this.loaderSubject.asObservable();
  public loaderState = new EventEmitter<boolean>();

  constructor() { }

  show() {
    console.log('onShow Loader');
    this.loaderState.emit(true);
  }

  hide() {
    console.log('onHide Loader');
    this.loaderState.emit(false);
  }
}
