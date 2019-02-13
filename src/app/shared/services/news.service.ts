import { Injectable } from '@angular/core';
import { News } from '../models/news.model';

@Injectable()
export class NewsService {

  // TODO: news management
  // TODO: mobile adjusty
  // TODO: zmiany Marcina w panelu

  private homeBar = 'Najbliższa planowana edycja studiów podyplomowych "Technologie Internetowe" - październik 2019!';
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
