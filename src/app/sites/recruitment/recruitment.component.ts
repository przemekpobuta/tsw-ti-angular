import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {

  items = [{name: 1}, {name: 2}, {name: 3}];

  constructor() { }

  ngOnInit() {
  }

}
