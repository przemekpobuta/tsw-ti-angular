import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-foler-dialog',
  templateUrl: './new-foler-dialog.component.html',
  styleUrls: ['./new-foler-dialog.component.scss']
})
export class NewFolerDialogComponent implements OnInit {

  folderName: string;

  constructor(
    public activeModal: NgbActiveModal
  ) {  }

  // TODO: dopracowanie modali
  // https://ng-bootstrap.github.io/#/components/modal/examples#component

  ngOnInit() {
  //  TODO: form
  }

  onClickCreate() {
    this.activeModal.close(this.folderName);
  }

}
