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

export const intelPut = async (intel) => {
  const resp = await fetch(`${webserver}/api/intel/${intel.pageId}`, {
    method: 'PUT',
    body: JSON.stringify(intel),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const put = await resp.json();
  return put;
}
