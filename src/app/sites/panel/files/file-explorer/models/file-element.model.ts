export class FileElement {
  id?: string; // uuid v4
  name: string;
  parent: string; // "root" or id
  isFolder: boolean;
  fileType?: string;
  url?: string;
}
