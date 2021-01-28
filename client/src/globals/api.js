import { webserver } from './socket'

export const intelGet = async (pageId) => {
  const resp = await fetch(`${webserver}/api/intel/${pageId}`);
  return resp;
}

export const intelPost = async () => {
  const resp = await fetch(`${webserver}/api/intel`, {
    method: 'POST'
  });
  const intel = await resp.json();
  return intel;
}

// This is for setting passwords
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

// This is for authenticating an intel using the password
export const intelAuthTokenPost = async (pageId, password) => {
  const resp = await fetch(`${webserver}/api/intel/${pageId}/token`, {
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
