export class FileElement {
  uuid?: string; // id
  name: string;
  file_extension: string; // isFolder
  file_type: string;
  parent_uuid: string; // parent / "root" or id
  owner?: number;
  updated_at?: string;
  is_visible: boolean;
}
