import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-foler-dialog',
  templateUrl: './new-foler-dialog.component.html',
  styleUrls: ['./new-foler-dialog.component.scss']
})
export class NewFolerDialogComponent implements OnInit {

  folderName: string;

  constructor(
  //  modalRef?
  ) {  }

  ngOnInit() {
  }

}
