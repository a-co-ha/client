export interface GetEditablePage {
  (
    channelId: string | string[] | undefined,
    pageId: string | string[] | undefined,
    type: string | string[] | undefined
  ): Promise<any>;
}

export interface GetEditablePages {
  (channelId: string | string[] | undefined): Promise<any>;
}

export interface GetChannels {
  (channelId: string | string[] | undefined): Promise<any>;
}
