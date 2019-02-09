import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  mode = 'edit-files'; // dla admin/moderator
  // mode = 'view'; // dla usera

  constructor() {}

  ngOnInit() {
  }

}
