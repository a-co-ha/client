import { getTimeValue } from './getTimeValue';
import type { OrgCommitList } from '@/pages/api/github/type';

export const commitDataTransfer = (commitArr: OrgCommitList[]) => {
  const transferedCommit = commitArr.map((commit) => {
    const message = commit.payload.commits[0].message;
    const author = commit.payload.commits[0].author.name;
    const branch = commit.payload.ref.substring(11);
    const time = getTimeValue(commit.created_at);
    const url = `https://github.com/${commit.repo.name}/${
      commit.type === 'PushEvent' ? `commit` : `issues`
    }/${commit.payload.head}`;
    return { message, author, branch, time, url };
  });

  return transferedCommit;
};
