export interface GetSocketPage {
  (
    channelId: string | string[] | undefined,
    pageId: string | string[] | undefined
  ): Promise<any>;
}
