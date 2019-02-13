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
      title: 'Title of the news',
      date: '19/08/2018',
      content: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.'
    },
    {
      id: 2,
      title: 'Title of the news',
      date: '21/08/2018',
      content: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.'
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
