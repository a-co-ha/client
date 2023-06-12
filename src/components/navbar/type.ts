import type { Blob } from 'buffer';

export interface ProjectDeleteName {
  ProjectDeleteName: string;
}

export interface ProjectChangeInfo {
  projectChangeImage: string;
  projectChangeName: string;
}

export interface ProjectChangeImage {
  projectChangeImage: string;
}

export interface ProjectChangeInfoResponse {
  id: number;
  userId: number;
  channelName: string;
  channelImg: string;
}

// export interface File extends Blob {
//   lastModified: number;
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
// }
