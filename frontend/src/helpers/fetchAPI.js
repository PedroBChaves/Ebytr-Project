const url = 'http://localhost:3333/tasks';

export default class APIFetch {
  tasksGet = async () => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}
