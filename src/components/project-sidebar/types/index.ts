export interface ProjectTitle {
  projectTitle: string;
}

export interface Channels {
  id: string;
  channelName: string;
}

export interface PageTitle {
  pageTitle: string;
}

export interface PageTitleLinkProps {
  channelId: string | string[] | undefined;
  pageId: string;
  pageTitle: string;
  type: string;
}
