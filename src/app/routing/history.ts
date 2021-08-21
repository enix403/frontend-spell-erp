import { createBrowserHistory, createHashHistory } from 'history';
import axios from 'axios';

const instance = axios.create({});

export const history = createBrowserHistory();
// export const history = createHashHistory();
