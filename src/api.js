import Task from "./models/task.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    // const headers = new Headers();
    // headers.append(`Authorization`, this._authorization);

    // return fetch(`https://11.ecmascript.pages.academy/task-manager/tasks`, {headers})
    return this._load({url: `tasks`})
    .then(checkStatus)
    .then((response) => response.json())
    .then(Task.parseTasks);
  }

  createTask(task) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Task.parseTask);
  }

  updateTask(id, data) {
    // const headers = new Headers();
    // headers.append(`Authorization`, this._authorization);
    // headers.append(`Content-Type`, `application/json`);

    // return fetch(`https://11.ecmascript.pages.academy/task-manager/tasks/${id}`, {
    //   method: `PUT`,
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      // .then(checkStatus)
      .then((response) => response.json())
      .then(Task.parseTask);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
