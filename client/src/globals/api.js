import { webserver } from './socket'

export const intelGet = async (pageId) => {
  let token = sessionStorage.getItem('intelToken');
  token = token ? `Bearer ${token}` : ''

  const resp = await fetch(`${webserver}/api/intel/${pageId}`, {
    headers: {
      'Authorization': token
    }
  });
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

  let token = '';
  if (resp.status === 201) {
    token = await resp.text();
    sessionStorage.setItem('intelToken', token);
  }
  return token;
}

// This is for uploading team images
export const towerImagePost = async (file, pageId, towerLocation, towerId, teamIndex) => {
  let formData = new FormData();
  formData.append("uploadedImage", file);

  const resp = await fetch(`${webserver}/api/intel/${pageId}/image?towerLocation=${towerLocation}&towerId=${towerId}&teamIndex=${teamIndex}`, {
    method: 'POST',
    body: formData
  });
  return resp;
};

export const towerImageGet = async (pageId, towerLocation, towerId) => {
  const resp = await fetch(`${webserver}/api/intel/${pageId}/image?towerLocation=${towerLocation}&towerId=${towerId}`, {
    method: 'GET'
  });
  return resp;
};

export const sessionPost = async (token) => {
  const resp = await fetch(`${webserver}/api/session`, {
    method: 'POST',
    body: JSON.stringify({
      token: token
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return await resp.text();
}
