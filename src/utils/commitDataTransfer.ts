import { getTimeValue } from './getTimeValue';

export const commitDataTransfer = async (arr: any) => {
  try {
    const transferedCommit = arr.map((item: any) => {
      if (item.type) {
        //commit 일때
        const message = item.payload.commits[0].message;
        const author = item.payload.commits[0].author.name;
        const branch = item.payload.ref.substring(11);
        const time = getTimeValue(item.created_at);
        const url = `https://github.com/${item.repo.name}/commit/${item.payload.head}`;
        return { message, author, branch, time, url };
      } else {
        // issue 일때
        const title = item.title;
        const author = item.user.name;
        const time = getTimeValue(item.createAt);
        const url = item.url;
        const labels = [
          { name: item.labels[0]?.name, color: item.labels[0]?.color },
        ];

        return { title, author, labels, time, url };
      }
    });
    return transferedCommit;
  } catch (e) {
    return null;
  }
};
