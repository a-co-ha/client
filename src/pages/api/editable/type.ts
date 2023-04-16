import { SocketPage } from '../socket/type';

export interface GetEditablePage {
  channelId: string | string[] | undefined;
  pageId: string | string[] | undefined;
  type: string | string[] | undefined;
}

export interface GetChannelPages {
  _id: string;
  channelId: number;
  EditablePage: EditablePage[];
  SocketPage: EditablePage[];
}

export interface EditablePage {
  page? : {
    _id: string;
    pageName: string;
    type: string;
    categories: string;
  };
  template?: {
    _id: string;
    pageName: string;
    type: string;
    categories: string;
  };
  _id: string;
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

export interface pageProps {
  channelId: string;
  pageId: string;
  type: string;
}
