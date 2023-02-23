// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// import qs from 'qs';
// typimport { githubLogo } from '@/images/githubLogo.png';
// e GitHubOauthToken = {
//   access_token: string;
// };

// interface GitHubUser {
//   login: string;
//   id: number;
//   node_id: string;
//   avatar_url: string;
//   gravatar_id: string;
//   url: string;
//   html_url: string;
//   followers_url: string;
//   following_url: string;
//   gists_url: string;
//   starred_url: string;
//   subscriptions_url: string;
//   organizations_url: string;
//   repos_url: string;
//   events_url: string;
//   received_events_url: string;
//   type: string;
//   site_admin: boolean;
//   name: string;
//   company: string;
//   blog: string;
//   location: null;
//   email: string;
//   hireable: boolean;
//   bio: string;
//   twitter_username: string;
//   public_repos: number;
//   public_gists: number;
//   followers: number;
//   following: number;
//   created_at: Date;
//   updated_at: Date;
// }

// type Data = {
//   name: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   if (req.method === 'post') {
//     try {
//       const { data } = await axios.post(
//         `https://github.com/login/oauth/access_token`,
//         {
//           client_id: process.env
//             .NEXT_PUBLIC_APP_GITHUB_OAUTH_CLIENT_ID as string,
//           client_secret: process.env
//             .NEXT_PUBLIC_APP_GITHUB_OAUTH_CLIENT_SECRET as string,
//           code: '6600ca6684e2fde7513d',
//         },
//         {
//           headers: {
//             accept: 'application/json',
//           },
//         }
//       );
//       console.log(data);
//     } catch (err: any) {
//       throw Error(err);
//     }
//   }
//   res.status(200).json({ name: 'e' });
// }
