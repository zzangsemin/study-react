import Router from 'koa-router';
import auth from './auth/index';
import posts from './posts';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

// 라우터를 내보냄
export default api;
