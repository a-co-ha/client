import { rest } from 'msw';
import { nanoId } from '@/utils/nanoId';

const handlers = [
  rest.get('http://localhost:3001/api/user', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 0,
        github_id: 'tangjin',
        github_url: 'http://locla',
        img: '',
        name: 'tangjin',
        channels: [
          {
            id: 45,
            admin: 'tangjin',
            channelName: 'dns',
            channelImg: 'null',
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
  rest.get(`http://localhost:3001/api/page/:pageId`, (_, res, ctx) => {
    // rest.get(`http://localhost:3000/api/progress/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pageName: '제목없음',
        blocks: [
          {
            blockId: '1',
            tag: 'p',
            html: '',
            imgUrl: '',
          },
        ],
      })
    );
  }),
  rest.put(`http://localhost:3001/api/page/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        blocks: [
          {
            blockId: '1',
            tag: 'p',
            html: 'testPage',
            imgUrl: '',
          },
        ],
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
        admin: 'admin',
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

  rest.post(`http://localhost:3001/api/page`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        channelId: 4,
        pageName: '제목 없음,no',
        initial: true,
        blocks: [
          {
            blockId: 'dsajfafs73',
            tag: 'p',
            html: '',
            imgUrl: '',
            _id: '6417259dbf5edcb10422e5e4',
          },
        ],
        type: 'normal',
        progressStatus: 'null',
        categories: 'page',
        _id: '6417259dbf5edcb10422e5e3',
        label: [],
        createdAt: '2023-03-19T15:09:17.162Z',
        updatedAt: '2023-03-19T15:09:17.162Z',
        __v: 0,
      })
    );
  }),
  rest.post(`http://localhost:3001/api/page/socket`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        channelId: 1,
        pageName: '제목 없음,so',
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
  rest.get(`http://localhost:3001/api/page`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        List: [
          {
            _id: 'editable1234',
            pageName: '제목 없음,no',
            type: 'normal',
          },
          {
            _id: 'editable5678',
            pageName: '제목 없음,no2',
            type: 'normal',
          },
          {
            _id: 'socket5678',
            pageName: '제목 없음,so',
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
              imgUrl: '',
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

  rest.put(`http://localhost:3001/api/page/:pageId`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        List: [
          {
            pageId: 'editable1234',
            pageName: '제목 없음,no',
            type: 'normal',
            initial: true,
          },
          {
            pageId: 'socket5678',
            pageName: '제목 없음,so',
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
        token: {
          accessToken: '12345',
        },
      })
    );
  }),
  rest.post('http://localhost:3001/post/images/testPageId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Image uploaded successfully!',
        imgUrl: 'url',
      })
    );
  }),
  rest.get(`http://localhost:3001/channel/users`, (_, res, ctx) => {
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
