import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollToTop() {
    console.log('ScrollToTop Service');

    const config: ScrollToConfigOptions = {
      target: 'page-top'
    };

    this._scrollToService.scrollTo(config);
  }
}
