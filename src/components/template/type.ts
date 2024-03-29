export interface TemplatePageProps {
  channelId: string;
  pageId: string;
  type: string;
}

export interface PageInTemplateProps {
  channelId: string;
  pageId: string;
  pageName: string;
  type: string;
  position: number;
  label: Labels[] | string[];
}

export interface PageInPageList {
  label: string[];
  pageName: string;
  progressStatus: string;
  type: string;
  _id: string;
}

export interface Labels {
  content: string;
  _id: string;
}
