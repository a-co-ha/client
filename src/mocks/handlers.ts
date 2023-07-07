import { rest } from 'msw';

import { nanoId } from '@/utils/nanoId';

const handlers = [
  rest.get('http://localhost:3000/api/user', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: [
          {
            github_id: 'tangjin',
            github_url: 'https://github.com/tangjinlog',
            img: '',
            name: 'tangjin',
            channel_id: '1',
            channel_name: '아코하',
            channel_admin: 'tangjin',
            channel_img: '',
          },
        ],
      })
    );
  }),
  rest.post('post/api/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(res));
  }),
  rest.post('http://localhost:3000/pages', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pageId: 'testPageId',
        creator: 'testUserObjId',
      })
    );
  }),
  // progress-normal
  rest.get(`http://localhost:3000/api/post/:pageId`, (_, res, ctx) => {
    // rest.get(`http://localhost:3000/api/progress/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: {
          blocks: [
            {
              blockId: '1',
              tag: 'p',
              html: '',
              imageUrl: '',
            },
          ],
        },
      })
    );
  }),
  rest.put(`http://localhost:3000/api/post/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: {
          blocks: [
            {
              blockId: '1',
              tag: 'p',
              html: 'testPage',
              imageUrl: '',
            },
          ],
        },
      })
    );
  }),
  rest.get(`http://localhost:3000/login`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 'tangjin',
          avatarUrl: '/public/images/githubLogo.png',
        },
      })
    );
  }),
  rest.post('http://localhost:3000/post/images/testPageId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Image uploaded successfully!',
        imageUrl: 'url',
      })
    );
  }),
  rest.get(`http://localhost:3000/channel/users`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: [
          {
            name: '상진',
            _id: nanoId(),
          },
          {
            name: '승하',
            _id: nanoId(),
          },
          {
            name: '수호',
            _id: nanoId(),
          },
          {
            name: '정현',
            _id: nanoId(),
          },
          { name: 'Wade Cooper', _id: nanoId() },
          { name: 'Arlene Mccoy', _id: nanoId() },
          { name: 'Devon Webb', _id: nanoId() },
          { name: 'Tom Cook', _id: nanoId() },
          { name: 'Tanya Fox', _id: nanoId() },
          { name: 'Hellen Schmidt', _id: nanoId() },
        ],
      })
    );
  }),
];

export default handlers;
