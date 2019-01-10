import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loaderState = new BehaviorSubject<boolean>(false);
  navItem$ = this._loaderState.asObservable();
  constructor() { }

  showLoader() {
    this._loaderState.next(true);
    console.log('onShow Loader');
  }

  hideLoader() {
    console.log('onHide Loader');
    this._loaderState.next(false);
  }
}
