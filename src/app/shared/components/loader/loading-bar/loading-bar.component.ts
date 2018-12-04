import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingBarComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: boolean) => {
        this.show = state;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
