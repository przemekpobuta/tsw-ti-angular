import { Component, OnInit } from '@angular/core';
import { EditHomeBarModalComponent } from './edit-home-bar-modal/edit-home-bar-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { NewsService } from 'src/app/shared/services/news.service';
import { News } from 'src/app/shared/models/news.model';
import { EditNewsModalComponent } from './edit-news-modal/edit-news-modal.component';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit {

  news: News[] = [];
  isLoadingData = false; // TODO

  constructor(
    private modalService: NgbModal,
    private newsService: NewsService
    ) { }

  ngOnInit() {
    this.news = this.newsService.getAllNews();
  }

  openEditHomeBarModal() {
    const editHomeBarModalRef = this.modalService.open(EditHomeBarModalComponent);

    editHomeBarModalRef.result.then(
      res => {
        console.log(res);
        // TODO: odśwież aktualności
        // this.getAccountsReq();
      },
      dismiss => {
        console.error(dismiss);
        // TODO: odśwież aktualności
      });
  }
  openEditNewsModal(mode: string, news?: News) {
    // mode: add, edit
    const editNewsModalRef = this.modalService.open(EditNewsModalComponent, { size: 'lg' });
    editNewsModalRef.componentInstance.mode = mode;
    if (mode === 'add') {
      editNewsModalRef.componentInstance.news_id = null;
    } else if (mode === 'edit') {
      editNewsModalRef.componentInstance.news_id = news.id;
    }

    editNewsModalRef.result.then(
      res => {
        console.log(res);
        // TODO: odśwież aktualności
        // this.getAccountsReq();
      },
      dismiss => {
        console.error(dismiss);
        // TODO: odśwież aktualności
      });
  }

  onDeleteNews(news: News) {
    this.newsService.deleteNews(news.id);
  }

}
