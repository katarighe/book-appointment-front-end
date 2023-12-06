import StorageManager from '../format/StorageManager';

export const endpoint = 'http://localhost:3000/v1/';

export const formatDate = (date) => date;

export const getRequest = async (route) => fetch(endpoint + route, {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${StorageManager.getToken().token}`,
  },
}).then((response) => response);

export const postRequest = async (route, data) => fetch(endpoint + route, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${StorageManager.getToken().token}`,
  },
  body: JSON.stringify(data),
}).then((response) => response);

export const getOneDoctor = (id) => {
  const resultFetch = fetch(`${endpoint}doctors/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${StorageManager.getToken()}`,
    },
  })
    .then((res) => res.json());

  return resultFetch;
};
