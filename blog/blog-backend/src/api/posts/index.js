import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
// import { list, write, read, remove, update } from './posts.ctrl';
import * as postCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);
// posts.get('/:id', postCtrl.checkObjectId, postCtrl.read); // 이렇게 미들웨어를 추가해줘도 됨
// posts.delete('/:id', postCtrl.checkObjectId, postCtrl.remove);
// posts.patch('/:id', postCtrl.checkObjectId, postCtrl.update);

const post = new Router(); // /api/posts/:id
post.get('/', postCtrl.read);
post.delete('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
post.patch('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

posts.use('/:id', postCtrl.getPostById, post.routes());

export default posts;
