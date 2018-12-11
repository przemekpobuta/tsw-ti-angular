import { Injectable } from '@angular/core';
import {FileElement} from '../models/file-element.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

export interface IFileService {
  add(fileElement: FileElement);
  delete(id: string);
  update(id: string, update: Partial<FileElement>);
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}

@Injectable({
  providedIn: 'root'
})
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

  update(uuid: string, update: Partial<FileElement>) {
    let element = this.map.get(uuid);
    element = Object.assign(element, update);

    return this.http.put(environment.api_url + 'files/' + element.uuid, {name: element.name, parent: element.parent_uuid});
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
