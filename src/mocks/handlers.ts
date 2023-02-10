import { rest } from 'msw';
import { testData } from './api/data/testData';

const handlers = [
  rest.get('/post/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testData));
  }),
  rest.post('post/api/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(res));
  }),
  rest.post('http://localhost:3000/test', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: 'CSR Source',
        text: 'Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!',
      })
    );
  }),
];

export default handlers;
