import { webserver } from './socket'

export const intelGet = async (pageId) => {
  const resp = await fetch(`${webserver}/api/intel/${pageId}`);
  const intel = await resp.json();
  return intel;
}

export const intelPost = async () => {
  const resp = await fetch(`${webserver}/api/intel`, {
    method: 'POST'
  });
  const intel = await resp.json();
  return intel;
}

// Should change to a put if we let them modify passwords
export const intelPasswordPost = async (pageId, password) => {
  const resp = await fetch(`${webserver}/api/intel/${pageId}/password`, {
    method: 'POST',
    body: JSON.stringify({
      pageId: pageId,
      password: password
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return resp;
}
