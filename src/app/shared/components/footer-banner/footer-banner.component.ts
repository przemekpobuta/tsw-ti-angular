import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-banner',
  templateUrl: './footer-banner.component.html',
  styleUrls: ['./footer-banner.component.scss']
})
export class FooterBannerComponent implements OnInit {

  // basic / banner
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
