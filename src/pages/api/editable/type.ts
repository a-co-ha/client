export interface GetEditablePage {
  channelId: string | string[] | undefined;
  pageId: string | string[] | undefined;
  type: string | string[] | undefined;
}

export interface GetEditablePages {
  page: {
    _id: string;
    pageName: string;
    type: string;
    categories: string;
  };
}

export interface GetChannels {
  (channelId: string | string[] | undefined): Promise<any>;
}

export interface PostEditablePage {
  channelId: number;
  pageName: string;
  initial: boolean;
  blocks: [
    {
      blockId: string;
      tag: string;
      html: string;
      imgUrl: string;
      _id: string;
    }
  ];
  type: string;
  progressStatus: string;
  categories: string;
  _id: string;
  label: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
