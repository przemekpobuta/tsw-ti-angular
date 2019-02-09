import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FileElement} from './models/file-element.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NewFolerDialogComponent} from './modals/new-foler-dialog/new-foler-dialog.component';
import {RenameDialogComponent} from './modals/rename-dialog/rename-dialog.component';
import {UploadDialogComponent} from './modals/upload-dialog/upload-dialog.component';
import {MoveDialogComponent} from './modals/move-dialog/move-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FileExplorerComponent implements OnInit {

  @Input() mode: string;
  @Input() editAccessAccount: User;
  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;
  @Input() currentRoot: FileElement;
  @Input() isLoadingData: boolean;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementToggledVisibility = new EventEmitter<{user: User, fileElement: FileElement}>();
  @Output() elementMoved = new EventEmitter<FileElement>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();
  @Output() fileDownloaded = new EventEmitter<FileElement>();
  @Output() filesUploaded = new EventEmitter();

  orderType = ['file_extension'];
  user: User;
  modalOptions: NgbModalOptions = {
    centered: false
  };

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private scrollService: ScrollService
  ) {
  }

  ngOnInit() {
    console.log('mode:', this.mode);
    console.log(this.currentRoot);
    this.user = this.authService.getCurrentUser();
  }

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  downloadElement(element: FileElement) {
    console.log('Download element');
    //  TODO: request downloadElement
  }

  toogleElementVisibility(user: User, element: FileElement) {
    console.log('Toogle visibility');
    //  TODO: toogle visibility
    element.is_visible = !element.is_visible;
    this.elementToggledVisibility.emit({
      user: user,
      fileElement: element
    });
  }

  navigate(element: FileElement) {
    // if (this.mode === 'view') {
      if (element.file_type === 'folder') {
        this.navigatedDown.emit(element);
        this.scrollService.triggerScrollToTop();
      } else {
        this.downloadFile(element);
      }
    // }
  }

  navigateUp() {
    this.navigatedUp.emit();
    this.scrollService.triggerScrollToTop();
  }

  // moveElement(element: FileElement, moveTo: FileElement) {
  //   this.elementMoved.emit({element: element, moveTo: moveTo});
  // }

  openNewFolderDialog() {
    const newFolderDialogRef = this.modalService.open(NewFolerDialogComponent, this.modalOptions);
    newFolderDialogRef.result.then(res => {
        if (res) {
          this.folderAdded.emit({name: res});
        }
        // console.log(res);
      },
      dismiss => {
        console.log(dismiss);
      });
    // newFolderDialogRef.

  }

  openRenameDialog(element: FileElement) {
    const renameDialogRef = this.modalService.open(RenameDialogComponent, this.modalOptions);
    renameDialogRef.componentInstance.folderName = element.name;
    renameDialogRef.result.then(
      res => {
        if (res) {
          element.name = res;
          // console.log(res);
          this.elementRenamed.emit(element);
        }
      },
      dismiss => {
        console.log(dismiss);
      }
    );
  }

  openUploadDialog() {
    const uploadDialogRef = this.modalService.open(UploadDialogComponent, this.modalOptions);
    uploadDialogRef.componentInstance.parent_uuid = this.currentRoot ? this.currentRoot.uuid : '';

    console.log(this.currentRoot.uuid);

    uploadDialogRef.result.then(res => {
        if (res) {
          // this.folderAdded.emit({ name: res });
        }
        console.log(res);
        this.filesUploaded.emit();
      },
      dismiss => {
        console.log(dismiss);
        this.filesUploaded.emit();
        console.log();
      });
  }

  openMoveDialog(element: FileElement) {
    const moveDialogRef = this.modalService.open(MoveDialogComponent, this.modalOptions);
    moveDialogRef.componentInstance.parentUuid = element.parent_uuid;
    moveDialogRef.result.then(
      res => {
        console.log(res);
        if (res || res === null) {
          console.log('move:');
          console.log(res);
          element.parent_uuid = res;
          this.elementMoved.emit(element);
        }
      },
      dismiss => {
        console.log(dismiss);
      }
    );
  }

  downloadFile(element: FileElement) {
    if (this.mode !== 'edit-user-access') {
      this.fileDownloaded.emit(element);
    }
  }

  // openMenu(event: MouseEvent, viewChild: any) { // viewChild: MatMenuTrigger
  //
  // }

}
