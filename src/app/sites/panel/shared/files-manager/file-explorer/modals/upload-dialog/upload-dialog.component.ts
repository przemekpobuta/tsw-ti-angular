import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FileService} from '../../services/file.service';
import {forkJoin} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
  providers: [FileService]
})
export class  UploadDialogComponent implements OnInit {

  @ViewChild('file') file;
  @Input() parent_uuid;

  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Wyślij';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  disableClose = false;
  error = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fileService: FileService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      // return this.activeModal.close();
      return this.activeModal.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.fileService.upload(this.files, this.parent_uuid);
    console.log(this.progress);
    if (this.progress) {
      for (let key of this.progress) {
        this.progress[key].progress.subscribe(
          val => {
            console.log(val);
          },
          error => {
            console.log(error);
            this.error = error;
            this.alertService.error('Błąd przesyłania plików!');
            this.activeModal.dismiss(error);
          }
        );
      }
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Zakończ';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

}
