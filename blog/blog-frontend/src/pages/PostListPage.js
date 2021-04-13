import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PaginationContainer from '../containers/post/PaginationContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
