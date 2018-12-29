import { Injectable } from '@angular/core';
import {FileElement} from '../models/file-element.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {ResponseContentType} from '@angular/http';
import {PanelComponent} from '../../../panel.component';

export interface IFileService {
  add(fileElement: FileElement);
  delete(id: string);
  update(id: string, update: Partial<FileElement>);
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}

@Injectable()
export class FileService implements IFileService {

  // string?, fileElement
  private map = new Map<string, FileElement>();
  private querySubject: BehaviorSubject<FileElement[]>;

  constructor(
    private http: HttpClient
  ) {
  }

  getFiles() {
    return this.http.get(environment.api_url + 'files/');
  }

  createFolder(name: string, parent_uuid: string) {
    return this.http.post(environment.api_url + 'files/', {parent: parent_uuid, name: name});
  }

  add(fileElement: FileElement) {
    // fileElement.uuid = v4(); // generowny po stronie serwera
    this.map.set(fileElement.uuid, this.clone(fileElement));
    return fileElement;
  }

  delete(uuid: string) {
    return this.http.delete(environment.api_url + 'files/' + uuid);
  }

  deleteLocal(uuid: string) {
    this.map.delete(uuid);
  }

  downloadFile(uuid: string) {
    return this.http.get(environment.api_url + 'files/download/' + uuid, { responseType: 'blob' });
  }

  public upload(files: Set<File>, parent_uuid: string): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('parent', parent_uuid);
      console.log(parent_uuid);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', environment.api_url + 'files/', formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      if (file.size > environment.maxFileSize) {
        progress.error('Za duży plik!');
      } else {
      // send the http-request and subscribe for progress-updates

        const startTime = new Date().getTime();
        this.http.request(req).subscribe(event => {

          if (event.type === HttpEventType.UploadProgress) {
            // calculate the progress percentage

            console.log('Size:');
            console.log(event.total > 19000000);

            const percentDone = Math.round((100 * event.loaded) / event.total);
            // pass the percentage into the progress-stream
            progress.next(percentDone);
            // console.log(progress);
          } else if (event instanceof HttpResponse) {
            // Close the progress-stream if we get an answer form the API
            // The upload is complete
            progress.complete();
          }
        });
      }

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  update(uuid: string, update: Partial<FileElement>) {
    let element = this.map.get(uuid);
    element = Object.assign(element, update);

    return this.http.put(
      environment.api_url + 'files/' + element.uuid,
      {
        name: element.name,
        parent: element.parent_uuid,
        is_visible: element.is_visible
      });
    // this.map.set(element.uuid, element);
  }

  queryInFolder(folderId: string) {
    // TODO: co to robi?
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.parent_uuid === folderId) {
        result.push(this.clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  get(id: string) {
    return this.map.get(id);
    // console.log(this.map);
  }

  clone(element: FileElement) {
    // console.log(JSON.stringify(element));
    return JSON.parse(JSON.stringify(element));
  }
}
