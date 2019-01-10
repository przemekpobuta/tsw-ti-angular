import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    this.scrollService.triggerScrollToTop();
  }

}
