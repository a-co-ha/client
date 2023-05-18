import { getTimeValue } from './getTimeValue';

export const commitDataTransfer = async (arr: any) => {
  const transferedCommit = arr.map((item: any) => {
    if (item.type) {
      const message = item.payload.commits[0].message;
      const author = item.payload.commits[0].author.name;
      const branch = item.payload.ref.substring(11);
      const time = getTimeValue(item.created_at);
      const url = `https://github.com/${item.repo.name}/item/${item.payload.head}`;
      return { message, author, branch, time, url };
    } else {
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
};
