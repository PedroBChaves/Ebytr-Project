const url = 'http://localhost:3333/tasks';

export const tasksGet = async () => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const tasksPost = async (name, status) => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(
      { name, status },
    ),
  });
};

export const tasksPut = async (id, name, status) => {
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(
      { id, name, status },
    ),
  });
};

export const tasksDelete = async (id) => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(
      { id },
    ),
  });
};
