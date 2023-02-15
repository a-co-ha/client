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
];

export default handlers;
