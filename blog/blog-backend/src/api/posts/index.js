import Router from 'koa-router';
// import { list, write, read, remove, update } from './posts.ctrl';
import * as postCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', postCtrl.write);
// posts.get('/:id', postCtrl.checkObjectId, postCtrl.read); // 이렇게 미들웨어를 추가해줘도 됨
// posts.delete('/:id', postCtrl.checkObjectId, postCtrl.remove);
// posts.patch('/:id', postCtrl.checkObjectId, postCtrl.update);

const post = new Router(); // /api/posts/:id
post.get('/', postCtrl.read);
post.delete('/', postCtrl.remove);
post.patch('/', postCtrl.update);

posts.use('/:id', postCtrl.checkObjectId, post.routes());

export default posts;
