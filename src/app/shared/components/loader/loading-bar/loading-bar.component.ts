import {Component, OnDestroy, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../loader.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingBarComponent implements AfterViewInit, OnInit, OnDestroy {

  show: boolean;
  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    // console.log('loader state: ' + this.show);
    this.show = false;
  }

  ngAfterViewInit() {
    this.subscription = this.loaderService.navItem$.subscribe(
      res => {
        this.show = res;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }



}
