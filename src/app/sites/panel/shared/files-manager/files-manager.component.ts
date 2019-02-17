import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {FileElement} from './file-explorer/models/file-element.model';
import {Observable, Subscription} from 'rxjs';
import {FileService} from './file-explorer/services/file.service';
import {elementEnd} from '@angular/core/src/render3';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.scss']
})
export class FilesManagerComponent implements OnInit, OnDestroy {

  @Input() mode: string; // edit-files, edit-user-access, view
  @Input() editAccessAccount: User;

  public fileElements: Observable<FileElement[]>;

  constructor(
    public fileService: FileService,
    private alertService: ToastrService,
    private loaderService: LoaderService
  ) {
  }

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  getFilesSub: Subscription;
  isLoadingData = false;

  ngOnInit() {
    console.log('mode:', this.mode);
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

  getFilesByMode() {
    if (this.mode === 'edit-user-access') {
      // console.log('getFilesWithAccess');
      return this.fileService.getFilesWithAccess(this.editAccessAccount.id);
    } else {
      // console.log('getFiles');
      return this.fileService.getFiles();
    }
  }

  getFilesRequest() {
    this.loaderService.showLoader();
    this.isLoadingData = true;

    this.getFilesSub = this.getFilesByMode().subscribe((res: FileElement[]) => {
      console.log(res);
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
        this.loaderService.hideLoader();
        this.isLoadingData = false;
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
    this.fileService.delete(element.uuid).subscribe(
      res => {
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
      }
    );
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

  moveElement(moveTo: FileElement) {
    // this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.fileService.update(moveTo.uuid, {parent_uuid: moveTo.parent_uuid}).subscribe(
      res => {
        this.alertService.success('Przeniesiono plik/folder!');
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
  downloadFile(element: FileElement) {
    this.fileService.downloadFile(element.uuid).subscribe(
      res => {
        console.log(res);
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([res], { type: res.type });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = data;
        link.download = element.name + '.' + element.file_extension;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
        }, 100);
      },
      error => {
        console.error(error);
        this.alertService.error(error);
      },
      () => {
        this.getFilesRequest();
      }
    );

    // this.pservice.downloadfile(this.rundata.name, type)
    //   .subscribe(data => thefile = new Blob([data], { type: "application/octet-stream" }), //console.log(data),
    //     error => console.log("Error downloading the file."),
    //     () => console.log('Completed file download.'));
    //
    // let url = window.URL.createObjectURL(thefile);
    // window.open(url);

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
  toggleVisibilityElement(event) {
    // user: User, fileElement: FileElement
    console.log('toggleVisibilityElement', event.user, event.fileElement);
    // console.log('toggleVisibilityElement', event);
    this.fileService.toggleFileVisibilityForUser(event.user.id, event.fileElement.uuid).subscribe(
      res => {
        this.alertService.success('Zmieniono widoczność!');
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
  uploadedFiles() {
    this.getFilesRequest();
    // this.alertService.success('Poprawnie przesłano plik/pliki');
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
