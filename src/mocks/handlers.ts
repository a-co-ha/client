import { rest } from 'msw';

const handlers = [
  rest.get('http://localhost:3001/api/user', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        github_id: 'tangjin',
        github_url: 'http://locla',
        img: '',
        name: 'tangjin',
        userHasChannels: [
          {
            channel_id: '1',
            channel: {
              id: 0,
              admin: '',
              channelName: '',
              channelImg: '',
            },
          },
        ],
      })
    );
  }),
  rest.post('post/api/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(res));
  }),
  rest.post('/pages', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pageId: 'testPageId',
        creator: 'testUserObjId',
      })
    );
  }),
  // progress-normal
  rest.get(`http://localhost:3001/api/post/:pageId`, (_, res, ctx) => {
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
  rest.put(`http://localhost:3001/api/post/:pageId`, (_, res, ctx) => {
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
  rest.get(`http://localhost:3001/login`, (_, res, ctx) => {
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

  rest.post(`http://localhost:3001/api/channel/create`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        channelName: '아코하',
      })
    );
  }),
  rest.get(`http://localhost:3001/api/channel`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        channelList: [
          {
            id: 1,
            channelName: '아코하',
          },
        ],
      })
    );
  }),

  rest.post(`http://localhost:3001/api/post`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        channelId: 1,
        pageTitle: '제목 없음,no',
        blocks: [
          {
            tag: 'p',
            html: '',
            imgUrl: '',
            blockId: '',
          },
        ],
        type: 'normal',
        _id: '63f8d17cd40953f24103bc44',
        label: [],
        createdAt: '2023-02-24T15:02:20.871Z',
        updatedAt: '2023-02-24T15:02:20.871Z',
        __v: 0,
      })
    );
  }),
  rest.post(`http://localhost:3001/api/post/socket`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        channelId: 1,
        pageTitle: '제목 없음,so',
        blocks: [
          {
            tag: 'p',
            html: '',
            imgUrl: '',
            blockId: 'socket',
          },
        ],
        type: 'normal',
        _id: '63f8d17cd40953f24103bc44',
        label: [],
        createdAt: '2023-02-24T15:02:20.871Z',
        updatedAt: '2023-02-24T15:02:20.871Z',
        __v: 0,
      })
    );
  }),
  rest.get(`http://localhost:3001/api/pages`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pageList: [
          {
            pageId: 'editable1234',
            pageTitle: '제목 없음,no',
            type: 'normal',
          },
          {
            pageId: 'editable5678',
            pageTitle: '제목 없음,no2',
            type: 'normal',
          },
          {
            pageId: 'socket5678',
            pageTitle: '제목 없음,so',
            type: 'socket',
          },
        ],
      })
    );
  }),
  rest.get(`http://localhost:3001/api/get/editable`, (_, res, ctx) => {
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
  rest.get(`http://localhost:3001/api/get/socket`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: [{ userId: 'tangjin', content: 'ha' }],
      })
    );
  }),

  rest.put(`http://localhost:3001/api/post/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pageList: [
          {
            pageId: 'editable1234',
            pageTitle: '제목 없음,no',
            type: 'normal',
            initial: true,
          },
          {
            pageId: 'socket5678',
            pageTitle: '제목 없음,so',
            type: 'socket',
            initial: true,
          },
        ],
      })
    );
  }),
  rest.get(`http://localhost:3001/api/oauth/github/callback`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          github_id: 'tangjin',
          github_url: 'https://github.com/tangjinlog',
          img: '',
          name: 'tangjin',
          channel_id: '1',
          channel_name: '아코하',
          channel_admin: 'tangjin',
          channel_img: '',
          accessToken: '12321',
          refreshToken: '12321',
        },
      })
    );
  }),
];

export default handlers;
