import { rest } from 'msw';
import { testData } from './api/data/testData';

const handlers = [
  rest.get('/post/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testData));
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
  rest.get(`http://localhost:3000/page/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: {
          blocks: [
            {
              _id: '1',
              tag: 'p',
              html: '첫번째',
              imageUrl: '',
            },
            {
              _id: '2',
              tag: 'p',
              html: '두번째',
              imageUrl: '',
            },
            {
              _id: '3',
              tag: 'p',
              html: '네번째',
              imageUrl: '',
            },
            {
              _id: '4',
              tag: 'p',
              html: '다섯번째',
              imageUrl: '',
            },
            {
              _id: '5',
              tag: 'p',
              html: '여섯번째',
              imageUrl: '',
            },
            {
              _id: '6',
              tag: 'p',
              html: '일곱번째',
              imageUrl: '',
            },
          ],
        },
      })
    );
  }),
  rest.put(`http://localhost:3000/pages/:id`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: {
          blocks: [
            {
              _id: '1',
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
];

export default handlers;
