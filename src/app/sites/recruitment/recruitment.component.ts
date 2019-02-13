import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/models/news.model';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {

  // items = [{name: 1}, {name: 2}, {name: 3}];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

}
