import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileElement} from './models/file-element.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewFolerDialogComponent} from './modals/new-foler-dialog/new-foler-dialog.component';
import {RenameDialogComponent} from './modals/rename-dialog/rename-dialog.component';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  downloadElement(element: FileElement) {
    console.log('Download element');
  //  TODO: request downloadElement
  }
  toogleElementVisibility(element) {
    console.log('Toogle visibility');
  //  TODO: toogle visibility
  }

  navigate(element: FileElement) {
    if (element.file_type === 'folder') {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    const newFolderDialogRef = this.modalService.open(NewFolerDialogComponent);
    newFolderDialogRef.result.then(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
      // console.log(res);
    },
      dismiss => {
      console.log(dismiss);
      });
    // newFolderDialogRef.

  }

  openRenameDialog(element: FileElement) {
    const renameDialogRef = this.modalService.open(RenameDialogComponent);
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

  // openMenu(event: MouseEvent, viewChild: any) { // viewChild: MatMenuTrigger
  //
  // }

}
