import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Jsonp } from '@angular/http';

@Injectable()
export class NewsService {

  // TODO: news management
  // TODO: mobile adjusty
  // TODO: zmiany Marcina w panelu

  private homeBar = 'Najbliższa planowana edycja studiów podyplomowych "Technologie Internetowe" - październik 2019!';
  private news: News[] = [
    {
      id: 0,
      title: 'Title of the news',
      date: '19/08/2018',
      content: '<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat '
             + 'facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.</p>'
    },
    {
      id: 1,
      title: 'Title of the news',
      date: '21/08/2018',
      content: '<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat '
             + 'facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.</p>'
    }
  ];

  constructor() {
  }

  getHomeBar() {
    return this.homeBar;
  }

  updateHomeBar(homeBar: string) {
    this.homeBar = homeBar;
  }

  getAllNews() {
    return this.news;
  }

  getNews(id: number) {
    return this.news.find(x => x.id === id);
  }

  addNews(addedNews: News) {
    this.news.push(addedNews);
  }

  updateNews(news: News) {
    const oldNews = this.news.find(x => x.id === news.id);
    this.news[news.id] = news;
    // console.log(this.news);
    // const newNews = this.news[news.id];
  }

  deleteNews(news_id: number) {
    const oldNews = this.news;
    let newNews: News[];
    for (let news of oldNews) {
      if (news.id === news_id) {
        newNews = oldNews.splice(news_id, 1);
      }
    }
    console.log('newNews', newNews);

  }

}
