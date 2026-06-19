import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

// 1) GET /posts
// 모든 포스트를 가져온다.

// 2) GET /posts/:id
// id에 해당하는 포스트를 가져온다.

// 3) POST /posts
// 포스트를 생성한다.

// 4) PUT /posts/:id
// id에 해당하는 포스트를 변경한다.

// 5) DELETE /post/:id
// id에 해당하는 포스트를 삭제한다.

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(){
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string){
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    return this.postsService.createPost(author, title, content);
  }

  @Patch(':id')
  patchPost(
    @Param('id') id : string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    return this.postsService.updatePost(+id, author, title, content)
  }

  @Delete(':id')
  deletePost(
    @Param('id') id : string,
  ){
    return this.postsService.deletePost(+id)
  }
}
