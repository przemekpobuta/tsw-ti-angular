import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FileService} from '../../services/file.service';
import {FileElement} from '../../models/file-element.model';

@Component({
  selector: 'app-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss'],
  providers: [FileService]
})
export class MoveDialogComponent implements OnInit, OnDestroy {

  @Input() parentUuid: string;
  selectedFileParentUUID: string;
  getFilesSub: any;
  fileElements: FileElement[] = [];
  folderFilter: any = { file_type: 'folder' };

  constructor(
    public activeModal: NgbActiveModal,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.selectedFileParentUUID = this.parentUuid;
    this.getFilesSub = this.fileService.getFiles().subscribe(
      (res: FileElement[]) => {
        console.log(res);
        this.fileElements = res;
      }
    );
  }
  ngOnDestroy() {
    this.getFilesSub.unsubscribe();
  }

  onClickMove(parent_uuid: string) {
    console.log(this.parentUuid);
    if (this.parentUuid === parent_uuid) {
      this.activeModal.dismiss('Ten sam rodzic');
    } else {
      this.activeModal.close(parent_uuid);
    }
  }
  selectNewParent(file_uuid: string) {
    this.selectedFileParentUUID = file_uuid;
    console.log('Selected file');
    console.log(file_uuid);
  }

}
