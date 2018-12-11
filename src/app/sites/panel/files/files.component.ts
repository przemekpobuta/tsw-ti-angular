import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileElement} from './file-explorer/models/file-element.model';
import {Observable, Subscription} from 'rxjs';
import {FileService} from './file-explorer/services/file.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {

  public fileElements: Observable<FileElement[]>;

  constructor(
    public fileService: FileService,
    private alertService: ToastrService
  ) {
  }

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  getFilesSub: Subscription;

  ngOnInit() {

    this.getFilesRequest();

    // const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    // this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    // this.fileService.add({ name: 'Folder C', isFolder: true, parent: folderA.id });
    // this.fileService.add({ name: 'File A', isFolder: false, parent: 'root' });
    // this.fileService.add({ name: 'File B', isFolder: false, parent: 'root' });

    // this.fileElements.subscribe(
    //   result => {
    //     console.log('Files - aktualny widok:');
    //     console.log(result);
    //   }
    // );
  }

  getFilesRequest() {
    this.getFilesSub = this.fileService.getFiles().subscribe((res: FileElement[]) => {
        // console.log(res);
        res.forEach(value => {
          this.fileService.add(value);
        });
      },
      error => {
        console.error(error);
        this.alertService.error(error);
      },
      () => {
        this.updateFileElementQuery();
      });
  }

  ngOnDestroy() {
    if (this.getFilesSub) {
      this.getFilesSub.unsubscribe();
    }
  }

  addFolder(name: any) {
    let folderParent;
    if (this.currentRoot === null || this.currentRoot === undefined) {
      folderParent = null;
    } else {
      folderParent = this.currentRoot.uuid;
    }
    this.fileService.createFolder(name.name, folderParent).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.error(error);
        this.alertService.error(error);
      },
      () => {
        this.getFilesRequest();
      }
    );

    // this.fileService.add({
    //   file_extension: null,
    //   file_type: 'folder',
    //   name: folder.name,
    //   parent_uuid: this.currentRoot ? this.currentRoot.uuid : null
    // });
    // this.updateFileElementQuery();
  }

  removeElement(element: FileElement) {
    // TODO: remove at API
    this.fileService.delete(element.uuid).subscribe(res => {
      console.log(res);
      this.fileService.deleteLocal(element.uuid);
      this.alertService.success('Usunięto pomyślnie!');
    },
      error => {
        console.error(error);
        this.alertService.error(error);
      },
      () => {
        this.getFilesRequest();
      });
    // this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent_uuid === null) {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent_uuid);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    // this.fileService.update(event.element.id, { parent: event.moveTo.id });
    // this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    // TODO: API rename
    this.fileService.update(element.uuid, {name: element.name}).subscribe(
      res => {
        this.alertService.success('Zmieniono nazwę!');
      },
      error => {
        console.error(error);
        this.alertService.error(error);
      },
      () => {
        this.getFilesRequest();
      }
    );
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.uuid : null);
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

}
