import { uuid } from 'uuidv4';

export function getGitHubUrl() {
  const rootURl = 'https://github.com/login/oauth/authorize';

  const options = {
    client_id: process.env.NEXT_PUBLIC_APP_GITHUB_OAUTH_CLIENT_ID as string,
    redirect_uri: process.env
      .NEXT_PUBLIC_APP_GITHUB_OAUTH_REDIRECT_URL as string,
    scope: 'read:user',
    state: uuid(),
  };
  console.log(options);

  const qs = new URLSearchParams(options);
  console.log(`${rootURl}?${qs.toString()}`);
  return `${rootURl}?${qs.toString()}`;
}
