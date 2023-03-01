export interface GetEditablePage {
  (
    channelId: string | string[] | undefined,
    pageId: string | string[] | undefined
  ): Promise<any>;
}
