import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Jsonp } from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService {

  // private homeBar = 'Najbliższa planowana edycja studiów podyplomowych "Technologie Internetowe" - październik 2019!';
  // private news: News[] = [
  //   {
  //     id: 0,
  //     title: 'Title of the news',
  //     date: '2018-08-12',
  //     content: '<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat '
  //            + 'facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.</p>'
  //   },
  //   {
  //     id: 1,
  //     title: 'Title of the news',
  //     date: '2018-08-15',
  //     content: '<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat '
  //            + 'facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.</p>'
  //   }
  // ];

  constructor(private http: HttpClient) {
  }

  getHomeBar() {
    // return this.homeBar;
    return this.http.get(environment.api_url + 'news/1');
  }

  updateHomeBar(homeBar: News) {
    // this.homeBar = homeBar;
    return this.http.put(environment.api_url + 'news/1', homeBar);
  }

  getAllNews() {
    // return this.news;
    return this.http.get(environment.api_url + 'news');
  }

  getNews(id: number) {
    // return this.news.find(x => x.id === id);
    return this.http.get(environment.api_url + 'news/' + id);
  }

  addNews(addedNews: News) {
    // this.news.push(addedNews);
    return this.http.post(environment.api_url + 'news', addedNews);
  }

  updateNews(news: News) {
    // const oldNews = this.news.find(x => x.id === news.id);
    // this.news[news.id] = news;
    return this.http.put(environment.api_url + 'news/' + news.id, news);
  }

  deleteNews(news_id: number) {
    return this.http.delete(environment.api_url + 'news/' + news_id);
  }

}
