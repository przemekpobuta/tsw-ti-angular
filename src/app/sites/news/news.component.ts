import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { News } from 'src/app/shared/models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.news = this.newsService.getAllNews();
  }

}
