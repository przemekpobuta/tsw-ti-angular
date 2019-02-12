import { Injectable } from '@angular/core';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private homeBar = '';
  private news: News[] = [
      {
        id: 1,
        title: '',
        date: '',
        content: ''
      }
  ];

  constructor() { }

  getHomeBar() {
    return this.homeBar;
  }

  getAllNews() {
    return this.news;
  }
}
