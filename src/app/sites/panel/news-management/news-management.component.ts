import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditHomeBarModalComponent } from './edit-home-bar-modal/edit-home-bar-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { NewsService } from 'src/app/shared/services/news.service';
import { News } from 'src/app/shared/models/news.model';
import { EditNewsModalComponent } from './edit-news-modal/edit-news-modal.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit, OnDestroy {

  news: News[] = [];
  isLoadingData = false; // TODO

  getAllNewsSub: Subscription;
  deleteNewsSub: Subscription;

  constructor(
    private modalService: NgbModal,
    private newsService: NewsService,
    private alertService: ToastrService
    ) { }

  ngOnInit() {
    this.reqGetAllNews();
  }

  ngOnDestroy() {
    if (this.getAllNewsSub) { this.getAllNewsSub.unsubscribe(); }
    if (this.deleteNewsSub) { this.deleteNewsSub.unsubscribe(); }
  }

  reqGetAllNews() {
    this.getAllNewsSub = this.newsService.getAllNews().subscribe(
      (date: News[]) => {
        this.news = date;
        console.log(date);
      },
      err => {
        this.alertService.error(err, 'Błąd pobierania aktualności!');
      }
    );
  }

  openEditHomeBarModal() {
    const editHomeBarModalRef = this.modalService.open(EditHomeBarModalComponent);

    editHomeBarModalRef.result.then(
      res => {
        console.log(res);
      },
      dismiss => {
        console.error(dismiss);
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
        this.reqGetAllNews();
      },
      dismiss => {
        console.error(dismiss);
        this.reqGetAllNews();
      });
  }

  onDeleteNews(news: News) {
    this.deleteNewsSub = this.newsService.deleteNews(news.id).subscribe(
      res => {
        this.alertService.success('Usunięto aktualność');
      },
      err => {
        this.alertService.error(err, 'Błąd usuwania aktualności');
      },
      () => {
        this.reqGetAllNews();
      }
    );
  }

}
