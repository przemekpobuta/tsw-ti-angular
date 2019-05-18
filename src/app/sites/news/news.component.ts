import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { News } from 'src/app/shared/models/news.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[];
  getNewsSub: Subscription;
  error: boolean;
  isLoadingData = false; // TODO

  constructor(
    private newsService: NewsService,
    private alertService: ToastrService
  ) {}

  ngOnInit() {
    // this.news = this.newsService.getAllNews();
    this.getNewsSub = this.newsService.getAllNews().subscribe(
      (data: News[]) => {
        console.log(data);

        this.news = data.filter(art => {
          if (art.id !== 2) {
            return true;
          } else {
            return false;
          }
        });
      },
      err => {
        this.error = true;
      },
      () => {}
    );
  }

  ngOnDestroy() {
    if (this.getNewsSub) {
      this.getNewsSub.unsubscribe();
    }
  }
}
