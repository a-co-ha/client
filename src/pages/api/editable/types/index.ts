export interface GetEditablePage {
  channelId: string | string[] | undefined;
  pageId: string | string[] | undefined;
  type: string | string[] | undefined;
}

export interface GetEditablePages {
  _id: string;
  pageName: string;
  type: string;
}

export interface GetChannels {
  (channelId: string | string[] | undefined): Promise<any>;
}
