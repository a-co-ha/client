export interface ProjectName {
  projectName: string;
}

export interface Channels {
  id: number;
  channelName: string;
}

export interface PageName {
  pageName: string;
}

export interface PageNameLinkProps {
  channelId: string | string[] | undefined;
  pageId: string;
  pageName: string;
  type: string;
}
