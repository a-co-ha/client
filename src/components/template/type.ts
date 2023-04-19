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
}

export interface PageInPageList {
  label: string[];
  pageName: string;
  progressStatus: string;
  type: string;
  _id: string;
}
