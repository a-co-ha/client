export interface GetEditablePage {
  (
    channelId: string | string[] | undefined,
    pageId: string | string[] | undefined
  ): Promise<any>;
}

export interface GetEditablePages {
  (channelId: string | string[] | undefined): Promise<any>;
}
