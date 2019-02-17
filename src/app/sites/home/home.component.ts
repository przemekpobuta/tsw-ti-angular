import { Component, OnInit, OnDestroy } from '@angular/core';
import {LoaderService} from '../../shared/components/loader/loader.service';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { NewsService } from 'src/app/shared/services/news.service';
import { Subscription } from 'rxjs';
import { News } from 'src/app/shared/models/news.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  home1Icons = [
    'devicon-html5-plain',
    'devicon-css3-plain',
    'devicon-javascript-plain',
    'devicon-php-plain',
    'devicon-java-plain',
    'devicon-c-plain',
    'devicon-cplusplus-plain',
    'devicon-dot-net-plain',
    'devicon-mysql-plain',
    'devicon-oracle-original',
    'devicon-postgresql-plain',
    'devicon-sourcetree-plain',
    'devicon-photoshop-plain',
    'devicon-illustrator-plain'
  ];
  activeIcon = this.home1Icons[0];
  activeIconCounter = -1;
  startedHome1Animation = false;
  homeBarNews: string;

  getHomeBarSub: Subscription;

  constructor(
    private loaderService: LoaderService,
    private scrollService: ScrollService,
    private newsService: NewsService
  ) { }

  ngOnInit() {

    // this.scrollService.triggerScrollToTop();

    this.getHomeBarSub = this.newsService.getHomeBar().subscribe(
      (data: News) => {
        this.homeBarNews = data.content;
      },
      err => {
        console.error(err);
      }
    );
    console.log('homeBarNews', this.homeBarNews);
    
    setInterval(() => {
      this.startedHome1Animation = true;
      this.activeIconCounter++;
      if (this.activeIconCounter === this.home1Icons.length) {
        this.activeIconCounter = 0;
      }
      this.activeIcon = this.home1Icons[this.activeIconCounter];
    }, 3000);

    // this.loaderService.show();

  }
  ngOnDestroy() {
    if (this.getHomeBarSub) { this.getHomeBarSub.unsubscribe(); }
  }

}
